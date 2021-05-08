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
        const totalRam = await cmd("free -m | grep Mem | awk '{print $2 / 1000}'");
        const freeRam = await cmd("free -m | grep Mem | awk '{print $4 / 1000}'");
        const buffRam = await cmd("free -m | grep Mem | awk '{print $6 / 1000}'");
        const totalRamF = parseFloat(totalRam).toFixed(2) + ' GB';
        const usedRamF = (totalRam - freeRam - buffRam).toFixed(2) + ' GB';
        const freeRamF = (parseFloat(totalRam) - (totalRam - freeRam - buffRam)).toFixed(2) + ' GB';
        const data = {
            totaldisk: totalDiskSpace.replace('G', '') + ' GB',
            useddisk: usedDiskSpace.replace('G', '') + ' GB',
            freedisk: freeDiskSpace.replace('G', '') + ' GB',
            useddisk_p: usedDiskSpaceP,
            cpu_cores: cpuCores,
            uptime: uptime,
            totalram: totalRamF,
            freeram: freeRamF,
            usedram: usedRamF,
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