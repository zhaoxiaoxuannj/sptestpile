package datdtestspringboot.sptestpile.util;	/*
	 * 版权： 
	 * 描述：
	 * 修改人： zhaoxx
	 * 修改时间：2021-08-01
	 * 修改内容：新增
	 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class CommonUtil {
	private static Logger log= LoggerFactory.getLogger(CommonUtil.class);
	public static Object mapToEntity(Map<String,String[]> map, Class object){
		try {
			Object classobject=object.newInstance();
              for(String key:map.keySet())
			  {
			  	String methodname="set"+key.substring(0,1).toUpperCase()+key.substring(1);
			  	try {
					Method method = object.getDeclaredMethod(methodname, String.class);
					String param=map.get(key)[0];
					method.invoke(classobject,param);
				}catch (Exception e)
				{
					System.out.println(key+":"+e.getMessage());
				}
			  }
			  return classobject;
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
		}
         return null;
	}
	public static String executeCmdBackString(String cmd, String... args) throws InterruptedException, IOException {
		StringBuilder result = new StringBuilder();

		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.environment().put("LANG", "zh_CN.UTF-8");

		processBuilder.redirectErrorStream(true);
		List<String> list = new ArrayList<>();
		list.add(cmd);
		if (args != null) {
			list.addAll(Arrays.asList(args));
		}
		processBuilder.command(list.toArray(new String[0]));

		Process process = processBuilder.start();
		try (BufferedReader bufrIn = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {

			Callable<String> f = () -> {
				// 读取输出
				readResult(bufrIn,result);

				return result.toString();
			};
			try {
				String output = f.call();
				// 方法阻塞, 等待命令执行完成（成功会返回0）
				process.waitFor();

				return result.toString();
			} catch (Exception e) {
				log.error("获取输出流失败！", e);
				return "failed";
			}

		}
	}
	public static void readResult(BufferedReader bufrIn,StringBuilder result){
		String line = null;
		while (true) {
			try {
				if ((line = bufrIn.readLine()) == null) {
					break;
				}
			} catch (IOException e) {
				log.error(e.getMessage());
			}
			result.append(line).append("\r\n");
		}
	}
	public static String[] partitionCommandLine(final String command) {
		final ArrayList<String> commands = new ArrayList<>();

		int index = 0;

		StringBuffer buffer = new StringBuffer(command.length());

		boolean isApos = false;
		boolean isQuote = false;
		while (index < command.length()) {
			final char c = command.charAt(index);

			switch (c) {
				case ' ':
					if (!isQuote && !isApos) {
						final String arg = buffer.toString();
						buffer = new StringBuffer(command.length() - index);
						if (arg.length() > 0) {
							commands.add(arg);
						}
					} else {
						buffer.append(c);
					}
					break;
				case '\'':
					if (!isQuote) {
						isApos = !isApos;
					} else {
						buffer.append(c);
					}
					break;
				case '"':
					if (!isApos) {
						isQuote = !isQuote;
					} else {
						buffer.append(c);
					}
					break;
				default:
					buffer.append(c);
			}

			index++;
		}

		if (buffer.length() > 0) {
			final String arg = buffer.toString();
			commands.add(arg);
		}
		return commands.toArray(new String[commands.size()]);
	}
	public static  String execRuntime(String cmd) {
		try{
			Runtime runtime=Runtime.getRuntime();
			String[]cmdargs={"/bin/bash","-c",cmd};
			Process process = runtime.exec(cmdargs);
			process.waitFor();
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line = bufferedReader.readLine();
			StringBuilder stringBuilder = new StringBuilder();
			while (line != null) {
				stringBuilder.append(line).append("\r\n");
				line = bufferedReader.readLine();
			}
			return stringBuilder.toString();
		}
		catch (Exception e){
			log.error(e.getMessage());
		}
		return "";
	}
}
