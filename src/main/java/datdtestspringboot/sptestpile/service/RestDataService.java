package datdtestspringboot.sptestpile.service;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */

import datdtestspringboot.sptestpile.entity.ClientStartEntity;
import datdtestspringboot.sptestpile.entity.DetectDataEntity;
import datdtestspringboot.sptestpile.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class RestDataService {
	private static Logger logger = LoggerFactory.getLogger(RestDataService.class);
	@Value("${custom.config.dagentparentpath}")
	private String dagentpath;
	@Value("${custom.config.cmd3path}")
	private String cmd3path;
	public  String startClient(ClientStartEntity clientStartEntity) {
		try {
			Runtime runtime = Runtime.getRuntime();
			String serverip=clientStartEntity.getServerip();
			String serverport=clientStartEntity.getServerport();
			String rentid=clientStartEntity.getRentid();
			String dagentrealpath=dagentpath;
			if(!dagentrealpath.endsWith("/")){
				dagentrealpath=dagentpath+"/";
			}
			String processinfo=dagentrealpath+"agent"+" "+rentid+" "+serverip+" "+serverport;
			if(isExsitProcess(processinfo).length()>0)
			{
				return "进程已存在,无需重启";
			}
			String[]cmdargs={dagentrealpath+"agent",rentid,serverip,serverport,dagentrealpath+"client.pem"," &"};
			String inputcmdargs=String.join(" ",cmdargs);
			String execResult= CommonUtil.execRuntime(inputcmdargs);
			if(execResult.toString().contains("fail"))
			{
				return "启动失败,请查看后台配置是否正确";
			}
			Thread.sleep(1000);
			while(isExsitProcess(processinfo).length()==0){
				logger.info("agent 正在启动，请稍后");
			}
			return "启动成功";
		} catch (Exception e) {
			logger.error(e.getMessage());
			return "启动失败,请查看日志";
		}
	}
	public String stopClient(ClientStartEntity clientStartEntity) {
		try {
			String serverip = clientStartEntity.getServerip();
			String serverport = clientStartEntity.getServerport();
			String rentid = clientStartEntity.getRentid();
			String dagentrealpath = dagentpath;
			if (!dagentrealpath.endsWith("/")) {
				dagentrealpath = dagentpath + "/";
			}
			String processinfo = dagentrealpath + "agent" + " " + rentid + " " + serverip + " " + serverport;
			String processresultinfo=isExsitProcess(processinfo);
			if (processresultinfo.length() > 0) {
				String cmds=processresultinfo.replace("\r\n"," ");
				String killresult=CommonUtil.execRuntime("kill -9 "+cmds);
				if(killresult.equals(""))
				{
					return "进程停止成功";
				}
				else{
					return "进程停止失败:"+killresult;
				}
			} else {
				return "进程已停止,无需再停";
			}
		}catch (Exception e)
		{
			return "进程停止失败，请查看后台";
		}
	}
	public String setBasicInfo(ClientStartEntity clientStartEntity){
		String madulmflag=clientStartEntity.getMadulmflag();
		String contentflag=clientStartEntity.getContentflag();
		String cachettl=clientStartEntity.getCachettl();
		String reporttype=clientStartEntity.getReporttype();

		String detectinfo="\"detect set "+reporttype+" "+contentflag+" "+cachettl+" "+madulmflag+"\"";
		try {
			String resultinfo = CommonUtil.execRuntime(cmd3path+" 0.0.0.0 15100 2 "+detectinfo);
			if(!resultinfo.contains("fail")) {
				return "初始化成功";
			}
			else{
				return "初始化失败";
			}
		}catch (Exception e)
		{
			logger.error(e.getMessage());
			return "初始化失败";
		}
	}
	public String detectdomain(DetectDataEntity detectDataEntity){
		String destip=detectDataEntity.getDestIP();
		String sourceip=detectDataEntity.getSourceIP();
		String domain=detectDataEntity.getDomain();
		int detecttype=Integer.valueOf(detectDataEntity.getDetecttype());
		String detecttypestr="";
		switch (detecttype){
			case 1:
				detecttypestr="comp";
				break;
			case 2:
				detecttypestr="cache";
				break;
			case 3:
				detecttypestr="saas";
				break;
			default:
				break;
		}
		if(detecttypestr.equals(""))
		{
			return "检测失败";
		}
		String detectinfo="detect "+detecttypestr+" "+sourceip+" "+domain+" "+destip;
		try {
			String resultinfo = CommonUtil.executeCmdBackString(cmd3path, "0.0.0.0", "15100","2", detectinfo);
			return processDetectResultInfo(resultinfo);
		}catch (Exception e)
		{
			logger.error(e.getMessage());
			return "检测失败";
		}
	}
	public String isExsitProcess(String processinfo) {
		String resultstr = CommonUtil.execRuntime("ps -ef|grep -v grep|grep '" + processinfo + "'|awk -F' ' '{print $2}'");
		return resultstr;
	}
    public String batchDetect(List<MultipartFile> files){
		SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyyMMddHHmmss");
		String filepath=dagentpath;
		if(!filepath.endsWith("/"))
		{
			filepath=filepath+"/";
		}
		filepath=filepath+"output/";
		File parentFile=new File(filepath);
		parentFile.deleteOnExit();
		parentFile.mkdirs();
		for (int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			if (file.isEmpty()) {
				logger.error("文件内容为空，不能上传");
			}
			String fileName = file.getOriginalFilename();
			File dest = new File(filepath + fileName);
			try {
				file.transferTo(dest);
				logger.info("第" + (i + 1) + "个文件上传成功");
			} catch (IOException e) {
				logger.error(e.toString(), e);
				logger.error("上传第" + (i++) + "个文件失败");
			}
		}
		String detectinfo="detect batch "+filepath;
		try {
			String resultinfo = CommonUtil.executeCmdBackString(cmd3path, "0.0.0.0", "15100","2", detectinfo);
			return resultinfo;
		}catch (Exception e)
		{
			logger.error(e.getMessage());
			return "检测失败";
		}
	}
	private String processDetectResultInfo(String originalInfo){
         String resultInfo=originalInfo;
	     String[] infoArray=originalInfo.split("\r\n");
            if(infoArray[0].startsWith("risk is")){
                String riskInfo=infoArray[0].split(":")[1].trim();
                if(riskInfo.endsWith("0"))
                {
                    resultInfo= "正常域名";
                }
                else{
                    String risktype=infoArray[1].split(":")[1].trim();
                    if(risktype.equals("11308"))
                    {
                        resultInfo="DGA域名";
                    }
                    else if(risktype.equals("11319")){
                        resultInfo="fast flux域名";
                    }
                    else if (risktype.equals("11317")){
                        resultInfo="DNS隐蔽隧道域名";
                    }
                    else{
                        resultInfo="未知";
                    }
                }
            }
            else{
                 resultInfo="未知";
            }
            return resultInfo;
    }
}
