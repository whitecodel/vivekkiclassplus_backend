const router = require('express').Router();
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

router.get('/systeminfo', NotLoggedIn, async (req, res) => {
    const totalDiskSpace = await cmd("df -h / | tail -1 | awk '{print $2}'");
    const usedDiskSpace = await cmd("df -h / | tail -1 | awk '{print $3}'");
    const freeDiskSpace = await cmd("df -h / | tail -1 | awk '{print $4}'");
    const usedDiskSpaceP = await cmd("df -h / | tail -1 | awk '{print $5}'");
    const cpuCores = await cmd("nproc");
    const uptime = await cmd(`uptime | awk -F'( |,|:)+' '{
        d=h=m=0;
        if ($7=="min")
            m=$6;
        else {
            if ($7~/^day/) { d=$6; h=$8; m=$9}
            else {h=$6;m=$7}
            }
        }
        {
            print d+0,"days,",h+0,"hours,",m+0,"minutes."
        }'`);
    const totalRam = await cmd("awk '/MemTotal/ {print $2}' /proc/meminfo");
    const freeRam = await cmd("awk '/MemFree/ {print $2}' /proc/meminfo");
    const totalRamF = (parseInt(totalRam) / 1000000).toFixed(2) + ' GB';
    const freeRamF = (parseInt(freeRam) / 1000000).toFixed(2) + ' GB';
    const data = {
        totaldisk: totalDiskSpace,
        useddisk: usedDiskSpace,
        freedisk: freeDiskSpace,
        useddisk_p: usedDiskSpaceP,
        cpu_cores: cpuCores,
        uptime: uptime,
        totalram: totalRamF,
        freeram: freeRamF,
    }
    return res.render('admin/systeminfo.ejs', data);
});

async function cmd(cmd) {
    try {
        const {
            stdout,
            stderr
        } = await exec(cmd);
        if (stderr) {
            return 'Error';
        } else {
            return stdout.replace(/\r?\n|\r/g, " ");
        }
    } catch (error) {
        return 'Error';
    }
}

module.exports = router