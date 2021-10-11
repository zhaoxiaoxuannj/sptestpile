package datdtestspringboot.sptestpile.util;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */
public class TestUtil {
	public static void main(String[]args){
		String attr="20000                        \n" +
				"1000                         \n" +
				"30000                        \n" +
				"7000                         \n" +
				"1000                         \n" +
				"7000                         \n" +
				"8000                         \n" +
				"500                          \n" +
				"2000                         \n" +
				"2000                         \n" +
				"1000                         \n" +
				"1000                         \n" +
				"500                          \n" +
				"2000                         \n" +
				"1000                         \n" +
				"7000                         \n" +
				"4000                         \n" +
				"2000                         \n" +
				"6000                         \n" +
				"1000                         \n" +
				"5000                         \n" +
				"1000                         \n" +
				"4000                         \n" +
				"10000";
		String[]attrarray=attr.split("\n");
		Integer result=0;
		for(String tmp:attrarray)
		{
			result+=Integer.valueOf(tmp.split(" ")[0]);
		}
		System.out.println(result);
	}
}
