package datdtestspringboot.sptestpile.entity;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */
public class DetectDataEntity {
	private String sourceIP;
	private String destIP;
	private String domain;
	private String detecttype;

	public String getSourceIP() {
		return sourceIP;
	}

	public void setSourceIP(String sourceIP) {
		this.sourceIP = sourceIP;
	}

	public String getDestIP() {
		return destIP;
	}

	public void setDestIP(String destIP) {
		this.destIP = destIP;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		String[] domainarrays=domain.split(";");
				if(domainarrays.length!=3){
					System.out.println("输入异常");
				}
				else{
					this.sourceIP=domainarrays[0];
					this.domain=domainarrays[1];
					this.destIP=domainarrays[2];
				}
	}

	public String getDetecttype() {
		return detecttype;
	}

	public void setDetecttype(String detecttype) {
		this.detecttype = detecttype;
	}
}
