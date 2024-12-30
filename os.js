const os= require('os');
const fs=require('fs/promises');

async function oswrite(){
    try{

        const osinfo={
            hostname:os.hostname(),
            plateform:os.platform(),
            type:os.type(),
            release:os.release(),
            rch:os.arch(),
            totalmemory:os.totalmem(),
            freememory:os.freemem(),
            uptime:os.uptime(),
            networkinterface:os.networkInterfaces(),
        };

        const info=JSON.stringify(osinfo,null,2);

        await fs.writeFile('ossystreminfo.txt',info);
        console.log("successfully submited");
    }
    catch(err)
    {
        console.log(err);
    }
}
oswrite();