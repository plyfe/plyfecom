/**
 * Creates a host object that adjusts with each of the different environments
 *
 * <p><b>Require Path:</b> foundation/hosts</p>
 *
 * @module Foundation
 * @class Hosts
 * @static
 **/
define(function () {
    var secure = window.location.protocol.indexOf('https') === 0;

    var env_deploy_imageHost = 'http://static01.nyt.com';
    var env_deploy_jsHost = 'http://static01.nyt.com';
    var env_deploy_cssHost = 'http://static01.nyt.com';
    var env_deploy_jsonHost = 'http://json8.nytimes.com';
    var env_deploy_imageSecureHost = 'https://static.nytimes.com';
    var env_deploy_jsSecureHost = 'https://static.nytimes.com';
    var env_deploy_cssSecureHost = 'https://static.nytimes.com';
    var env_deploy_jsonSecureHost = 'https://static.nytimes.com';
    var env_deploy_wwwHost = '//www.nytimes.com';
    var env_deploy_adxHost = '//www.nytimes.com';
    var env_deploy_authHost = 'https://myaccount.nytimes.com';
    var env_deploy_mtrSvcHost = '//meter-svc.nytimes.com';
    var env_deploy_profileImageHost = '//s3.amazonaws.com/pimage.timespeople.nytimes.com';
    var env_deploy_tagxHost = '//tagx.nytimes.com';
    var env_deploy_msgHost = 'http://www.nytimes.com';
    var env_deploy_msgSocketHost = 'http://core.fabrik.nytimes.com';
    var env_deploy_communityHost = '//www.nytimes.com';
    var env_deploy_dataUniverseHost = 'http://www.nytimes.com';
    var env_deploy_comscorePvcHost = '//www.nytimes.com';
    var env_deploy_raven = 'https://a8e1af9798e04d5d8836659cdbbec8b3@app.getsentry.com/15320';

    return {
        image: secure ? env_deploy_imageSecureHost : env_deploy_imageHost,
        js: secure ? env_deploy_jsSecureHost : env_deploy_jsHost,
        css: secure ? env_deploy_cssSecureHost : env_deploy_cssHost,
        json: secure ? env_deploy_jsonSecureHost : env_deploy_jsonHost,
        www: env_deploy_wwwHost,
        adx: env_deploy_adxHost,
        myaccount: env_deploy_authHost,
        meterSvc: env_deploy_mtrSvcHost,
        profileImage: env_deploy_profileImageHost,
        tagx: env_deploy_tagxHost,
        msg: env_deploy_msgHost,
        msgSocket: env_deploy_msgSocketHost,
        community: env_deploy_communityHost,
        du: env_deploy_dataUniverseHost,
        comscorePvc: env_deploy_comscorePvcHost,
        raven: env_deploy_raven
    };
});
