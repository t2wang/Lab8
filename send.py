from email.mime.text import MIMEText
from email.utils import formataddr
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP_SSL

##发邮件
##path_1 = "D:\工作日志\风控模板\Processing Code\email//"
##f = open(path_1+"新建文本文档.txt","r")
sender = "tonywang@oceanpayment.com.cn"
password = "Haiyue303@"
receiver = 'mc@oceanpayment.com.cn, tania@oceanpayment.com.cn'

def mail():
    file_name = "links.xlsx"
    ret=True

    msg=MIMEText('Hi 商管同事，\n\n附件为本周网站无法打开和存在网站跳转的详情，请安排处理。','plain','utf-8')
    csvpart = MIMEApplication(open("C://Users//tonywang//Desktop//Lab8//" + file_name, 'rb').read())
    csvpart.add_header('Content-Disposition', 'attachment', filename = file_name)    
    
    m = MIMEMultipart()
    m.attach(msg)
    m.attach(csvpart)
    m['From']=formataddr(["王韬睿",sender])  
    m['To']=formataddr(["商管同事", receiver])             
    m['Subject']="商户无法打开网站及跳转网站扫描"

    try:              
        server=SMTP_SSL("smtp.exmail.qq.com", 465)  
        server.login(sender, password)  
        server.sendmail(sender,receiver.split(","),m.as_string())  
        server.quit() 
    except: 
        ret=False
    return ret
 
ret=mail()
if ret:
    print("邮件发送成功")
else:
    print("邮件发送失败")