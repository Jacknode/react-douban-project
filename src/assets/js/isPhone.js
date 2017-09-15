/**
 * Created by leibo on 17/9/8.
 */
export default function (){
    var u = navigator.userAgent,version = '';
    if (u.indexOf('Mac OS X') > -1) {
        //ios
        var regStr_saf = /OS [\d._]*/gi;
        var verinfo = u.match(regStr_saf);
        version = (verinfo + "").replace(/[^0-9|_.]/ig,'').replace(/_/ig,'.');
    } else if (u.indexOf('Android') > -1
        || u.indexOf('Linux') > -1) {
        //android
        version = u.substr(u.indexOf('Android') + 8, u.indexOf(";", u.indexOf("Android")) - u.indexOf('Android') - 8);
    } else if (u.indexOf('BB10') > -1) {
        //黑莓bb10系统
        version = u.substr(u.indexOf('BB10') + 5, u.indexOf(";", u.indexOf("BB10")) - u.indexOf('BB10') - 5);
    } else if (u.indexOf('IEMobile')) {
        //windows phone
        version = u.substr(u.indexOf('IEMobile') + 9, u.indexOf(";", u.indexOf("IEMobile")) - u.indexOf('IEMobile') - 9);
    }
    return version;
}


