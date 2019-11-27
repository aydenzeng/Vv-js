const app = require('./app')
const cluster = require('cluster')
const os = require('os')
module.exports = {
    run:function(){
                    if (cluster.isMaster){
                        //根据cpu的核数自动开启多个进程
                        for(let i=0;i<os.cpus().length/2;i++)
                        {
                            const worker = cluster.fork()
                            let missPing = 0
                    
                            //每300 ms发送一个ping
                            let interval = setInterval(()=>{
                                // console.log('send ping')
                                worker.send('ping')
                                missPing++
                    
                                //如果错过心跳数超过3，判断为僵尸进程，杀掉
                                if(missPing >= 3){
                                    clearInterval(interval)
                                    process.kill(worker.process.pid)
                                }
                            },3000)
                            worker.on('message',(msg)=>{
                                if(msg == 'pong'){
                                    // console.log('get pong')
                                    missPing--
                                }
                            })
                        }
                            
                    
                        //主进程监听到退出事件,重新开启一个进程,防止错误导致不停fork,5秒后执行
                        cluster.on('exit',()=>{
                            setTimeout(() => {
                                cluster.fork()
                            }, 5000);
                        })
                    } else {
                        app.run()
                        //监听主进程发送过来的心跳并返回
                        process.on('message',(str)=>{
                            if(str == 'ping') {
                                process.send('pong')
                            }
                        })
                        process.on("uncaughtException",(err)=>{
                            console.error(err)
                            //当前进程发生不可预见错误,强制退出
                            process.exit(1)
                        })
                    }
    }
}


