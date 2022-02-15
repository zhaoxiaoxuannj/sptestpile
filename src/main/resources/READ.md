当前jar包启动命令：
带调试参数：
./java/jdk/bin/java  -Xdebug -Xrunjdwp:transport=dt_socket,address=28787,server=y,suspend=n -Dspring.config.location=/home/alipms/dnsDatdInterface/application.yml -jar root_iso-0.0.1-SNAPSHOT.jar &
不带调试参数：
nohup ./java/jdk/bin/java  -Dspring.config.location=/home/alipms/sptestpile/application.yml -jar sp-test-pile-0.0.1-SNAPSHOT.jar >/dev/null 2>&1 &

./agent_report 3 /home/alipms/sptestpile/client.pem 10.21.17.168 25000 /home/alipms/sptestpile/terbak/ >/dev/null 2>&1 &
agent_report的参数意义：
 1. 租户id
 2. 租户公钥文件
 3.defend的ip地址
 4.defend的服务端口
 5.读取数据的文件路径
 操作步骤：
 1.从管理平台下载相关租户信息的内容（公私钥、租户信息等）
 2.设置环境变量：
      在/etc/profile中添加如下内容，路径按照实际配置
      export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/alipms/sptestpile/lib/udep/lib/
 3.先启动agent_report
 4.再启动sp-test-file
 