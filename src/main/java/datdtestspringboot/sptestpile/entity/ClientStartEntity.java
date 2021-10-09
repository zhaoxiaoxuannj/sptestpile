package datdtestspringboot.sptestpile.entity;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */
public class ClientStartEntity {
	private String serverip;
	private String serverport;
	private String reporttype;
	private String madulmflag;
	private String contentflag;
	private String cachettl;
	private String rentid;

	public String getServerip() {
		return serverip;
	}

	public void setServerip(String serverip) {
		this.serverip = serverip;
	}

	public String getServerport() {
		return serverport;
	}

	public void setServerport(String serverport) {
		this.serverport = serverport;
	}

	public String getReporttype() {
		return reporttype;
	}

	public void setReporttype(String reporttype) {
		this.reporttype = reporttype;
	}

	public String getMadulmflag() {
		return madulmflag;
	}

	public void setMadulmflag(String madulmflag) {
		this.madulmflag = madulmflag;
	}

	public String getContentflag() {
		return contentflag;
	}

	public void setContentflag(String contentflag) {
		this.contentflag = contentflag;
	}

	public String getCachettl() {
		return cachettl;
	}

	public void setCachettl(String cachettl) {
		this.cachettl = cachettl;
	}

	public String getRentid() {
		return rentid;
	}

	public void setRentid(String rentid) {
		this.rentid = rentid;
	}
}
