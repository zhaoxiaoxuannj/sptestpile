package datdtestspringboot.sptestpile.controller;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */

import datdtestspringboot.sptestpile.entity.ClientStartEntity;
import datdtestspringboot.sptestpile.entity.DetectDataEntity;
import datdtestspringboot.sptestpile.service.RestDataService;
import datdtestspringboot.sptestpile.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class RestDataController {
	private static Logger logger = LoggerFactory.getLogger(RestController.class);
	@Value("${custom.config.dagentparentpath}")
	private String dagentpath;
	@Value("${custom.config.cmd3path}")
	private String cmd3path;
    @Autowired
    private RestDataService restDataService;
	@PostMapping("startClient")
	public String startClientInterface(HttpServletRequest request) {
		Map<String, String[]> param = request.getParameterMap();
		ClientStartEntity clientStartEntity = (ClientStartEntity) CommonUtil.mapToEntity(param, ClientStartEntity.class);
		String clientinfo=restDataService.startClient(clientStartEntity);
		String setbasicresult=restDataService.setBasicInfo(clientStartEntity);
		return clientinfo+";"+setbasicresult;
	}
	@PostMapping("stopClient")
	public String stopClientInterface(HttpServletRequest request) {
		Map<String, String[]> param = request.getParameterMap();
		ClientStartEntity clientStartEntity = (ClientStartEntity) CommonUtil.mapToEntity(param, ClientStartEntity.class);
		String clientinfo=restDataService.stopClient(clientStartEntity);
		return clientinfo;
	}
	@PostMapping("detectsubmit")
	public String detectSubmit(HttpServletRequest request) {
		Map<String, String[]> param = request.getParameterMap();
		DetectDataEntity detectDataEntity = (DetectDataEntity) CommonUtil.mapToEntity(param, DetectDataEntity.class);
		String detectresult=restDataService.detectdomain(detectDataEntity);
		return detectresult;
	}

	@PostMapping("detectbatchsubmit")
	public String detectbatchsubmit(HttpServletRequest req) {
		List<MultipartFile> files=((MultipartHttpServletRequest) req).getFiles("fileUpload");
		String detectresult= restDataService.batchDetect(files);
		return detectresult;
	}


}