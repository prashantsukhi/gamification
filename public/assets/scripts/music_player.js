var cm_user_id_val = ''; 
var is_subcr_user = '';
var page_title = '';
var myflag1 = false;
var consumptionEvent = '';
//console.log('HLS Check ' + document.createElement('audio').canPlayType('application/vnd.apple.mpegURL'));
var project_folder = 'store';
//var base_url = location.origin + "/" + project_folder + "/";
var base_url = window.location.protocol + "//" + window.location.hostname + "/" + project_folder + "/";
api_url = base_url + "index.php/my_account/";
streamType = "hls";

var hungama_video_player = {

    init_video : function () {

        console.log("videoplayer init");
        myflag1 = false;
        
        $('.loading').hide();
    
        /*if (content_id != '' && content_id > 0) {
            content_id_from_url = content_id;
        } else {
            content_id_from_url = $("#content_id_from_url").val();
        }

        if (content_id_from_url == '' || typeof content_id_from_url === "undefined") {

            content_id_from_url = '29166941';
        }*/

        /*console.log('hungamaplayer: content id passed ----->', content_id);
        console.log('hungamaplayer: content id transformed ----->', content_id_from_url);
        console.log('hungamaplayer: stream url ----->', base_url + "index.php/my_account/streamMisEntry/"+content_id_from_url+ '/hls');
        console.log(base_url + "index.php/my_account/streamMisEntry/"+content_id_from_url+ '/hls');*/
        
        // jQuery.ajax({
        //     url: 'http://localhost:2000/videos/video-4',
        //     async:false,
        //     success: function(url) {
        //         //result = JSON.parse(result);
        //         console.log(url);
        //         //albumdata["file"] = result['hls'];
        //          //video_playlist = {"album_name": albumdata["album_name"],"id_migration": albumdata["id_migration"] ,"file": albumdata["file"], "type": hls_video_type, "title": content_title , "image":image, "mediaid": "24564361"};
        //         //my_video_player.video_obj = result;

        //         var result = '{"hls":'+url+',"title":"Has Mat Pagli","albumname":"Toilet - Ek Prem Katha","genre":"Soundtrack","cid":"27659211","login_url":"","user_subscribed":1}';

        //         hungama_video_player.video_play(result);
        //         $('#img_cg').show();
        //     },
        // });

        var result = '{"hls":"'+$('#hls_url').val()+'","title":"Has Mat Pagli","albumname":"Toilet - Ek Prem Katha","genre":"Soundtrack","cid":"27659211","login_url":"","user_subscribed":1}';

        hungama_video_player.video_play(result);
    },

    video_play : function(videoObj) {

        console.log("in video play");
        $("#player_1").html("");
        player1Obj = null;
        result = JSON.parse(videoObj);
        console.log(videoObj);
        console.log(result);

        hls_video_type = my_video_player.getHlsType();
        var isMute = true;

        /*if (!Hls.isSupported()) {

            isMute = false;
        }*/
        
        videoConfigObj_1 = {
            autoStart: true,
            mute: isMute,
            controls: true,
            playertype: "video",
            platform: "WEB",
            property: "hunga",
            notifyAutoPlaySec: 10,
            notifyAutoPlayText: "Starts in",
            loginStatus: true,
            userQuality: 'auto',
            subscribeStatus: true,
            extraParam: {
                viewingTime: -1
            }
        };
        
        console.log(videoConfigObj_1);
    hls_video_playlist = {
        "file": result['hls'],
        "mediaid": result['cid'],
        "title": result['title'],
        "albumname": result['albumname'],
        "type": hls_video_type,
        "genre": result['genre'],
        "contenttype": "movie",
        "image":$("#poster_url").val(),
        "spd": {
            "sprite_image_path": [{
                "path": $("#poster_url").val()
            }, {
                "path": $("#poster_url").val()
            }]
        }
        /*
        "ad_setup": {
            "client": "googima",
            "tag": "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpreonly&cmsid=496&vid=short_onecue&correlator="
        }
        */
    };
    console.log(hls_video_playlist);
    player1Obj = makePlayer("player_1", hls_video_playlist, videoConfigObj_1);           
    /*if(vplayerLoaded == false){
        player1Obj = makePlayer("player_1", hls_video_playlist, videoConfigObj_1);
        vplayerLoaded = true;
    }else{
        player1Obj.load(hls_video_playlist);
    }*/

    return false;

    }
}

var my_video_player = {

    video_obj : {},
    videoConfigObj_1 : {},
    hls_video_playlist : {},

    hls_video_type : 'hls',

    is_subacribed_user : $('#is_subcr').val(),
    
    show_video : function() {

        console.log('++++++++++++++++++');
        console.log(hls_video_playlist);
        console.log('*************' + 0);
        $('#img_cg').hide();
        console.log('*************' + 1);
        //player1Obj.load(hls_video_playlist);
        console.log('*************' + 2);
        hap_audio.pause();
        player1Obj.play();
        console.log('*************' + 3);
        //my_video_player.jw_adComplete();
    },

    jw_adComplete : function() {
        console.log("player: complete here 1");
        $("#hun_vp .replysub").hide();
    },
    
    playNext : function(t, id, nextVideoId) {

        console.log('completed video object =====>' + t);
        console.log('completed video id =====>' + id);
        console.log('Next video id =====>' + nextVideoId);
        $("#content_id_from_url").val(nextVideoId);

        my_video_player.getStreameContentData(nextVideoId);
    },

    getHlsType: function() {

        isApple = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));

        hls_video_type = 'mp4';
        
        if (isApple) {
            hls_video_type = "mp4";
        }

        if (!Hls.isSupported()) {
            hls_video_type = "mp4";
        }

        return hls_video_type;

    },

    checkDeviceType: function() {

        isIphone = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));

        if (isIphone) {
            device = 'iphone';
        } else {
            device = 'android';
        }

        return device;

    }
};


var global_uuid = '';
$(document).ready(function() {
    /*$.ajax({
        url: "https://m.hungama.com/store/track_stream1.php?p=1",
        cache:false,
        type: "POST",
        data: {"uri": window.location.href},
    });*/
    //cm_Init();//CatchMedia
    myflag1 = false;
    page_title = $(document).attr('title');


    var player_config_object = {
        "loginStatus": true,
        "autoStart":true,
        "platform": "WAP",
        "property": "store",
        "subscribeStatus": false,
        "subscriptionPrice": 0,
        "email": "tech_sng@hungama.com",
        //"autoStart": false,
        //"userid": document.getElementById('pingsess').value
    };

    global_uuid = localStorage.getItem("pa-spa_cmsdk.consumer_id");
    
    console.log("aakesh uuid"+ global_uuid);
    jsonObj = [];
    audioPlayerObj = {};
    var json_playlist;
    var api_url = base_url + "index.php/my_account/";
    var music_player_packid = 11646;
    /*detect browser script starts */
    /*// Opera 8.0+ 
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    detect browser script ends */
    
    var streamCheck = document.createElement('audio').canPlayType('application/vnd.apple.mpegURL');
        streamCheck = (  streamCheck == '' ? 'no' : streamCheck);
        
    var mp3Check = document.createElement('audio').canPlayType('audio/mpeg;codecs=mp3');
        mp3Check = (  mp3Check == '' ? 'no' : mp3Check);
        
    var streamType;
    /*//if (isFirefox == true || isOpera == true) {*/
    streamType = 'hls';
    /*//} else {
     //    streamType = 'hls';
     //}*/
     /*if(streamCheck == 'no' || streamCheck == ''){
            streamType = 'mp3';
     }
     
     if(streamCheck == 'maybe' || mp3Check == 'probably'){
            streamType = 'mp3';
     }
     */
    //console.log("Retreiving pack data" + streamCheck + ' ' + streamType);
    
    var blnAllowPlayer = true;
    if(streamCheck == 'no' && mp3Check == 'no'  ){
        blnAllowPlayer = false;
    }

    hungama_video_player.init_video();

    /*$.ajax({
        url: "https://m.hungama.com/store/track_stream.php?a=" + blnAllowPlayer+"&b="+streamCheck+"&c="+mp3Check,
        cache:false,
        type: "POST",
        data: {"uri": window.location.href},
    });*/
    // Added this call to track supported handsets, when counts are stabalize disable this call and enable whenever required 
    //track_player_support(streamCheck,mp3Check,blnAllowPlayer);
    
    // if(blnAllowPlayer){
    //     $.ajax({
    //         url: api_url + "get_contents_from_music_pack/" + music_player_packid,
    //         method: 'POST'
    //     }).success(function(data) {

    //         var stream_type = 'hls';

    //         /*if (!Hls.isSupported()) {

    //             stream_type = 'mp3';
    //         }*/

    //         console.log('hungama_audio_player: loaded stream type -----', stream_type);
            
    //         console.log("content load");
    //         var streamCheck = document.createElement('audio').canPlayType('application/vnd.apple.mpegURL');
    //         streamCheck = (  streamCheck == '' ? 'no' : streamCheck);
            
    //         var mp3Check = document.createElement('audio').canPlayType('audio/mpeg;codecs=mp3');
    //         mp3Check = (  mp3Check == '' ? 'no' : mp3Check);
            
    //         $contentCount = 0;
    //         $contentCDNCount = 0;
    //         cdata = JSON.parse(data);
    //         if(is_popup) {
    //             console.log("popup set");
    //             $($( ".alblistnde .alblistn .alblistnin a" ).get().reverse()).each(function( index ) {
    //             if ($(this).attr('data-cont-type') == 21) {
    //                 /*if(checkIdeaCGRedirect() == true){
    //                     return false;
    //                 }*/
    //               albumdata = {};
    //               albumdata['id_migration'] = $(this).attr("data-cid");
    //               albumdata["song_name"] = $(this).attr("data-cname");
    //               albumdata["date"] = '2015';
    //               albumdata["singer_name"] = '';
    //               albumdata["preview_link"] = '';
    //               albumdata["album_image"] = $(this).find("img").attr("src");
    //               albumdata["album_name"] = $(this).attr("data-album");
    //               albumdata["download_url"] = $(this).attr("href");
    //               albumdata["id_album"] = "";
    //               albumdata["img_src"] = $(this).find("img").attr("src");
    //               albumdata["lyrics"] = '';
    //               albumdata["trivia"] = '';
    //               albumdata["lyricist"] = '';
    //               albumdata["contenttype"] = '';
    //               albumdata["type"] = stream_type;
    //               albumdata["file"] = base_url + 'index.php\/my_account\/mdn\/' + $(this).attr("data-cid") + '\/' + streamType;
    //               //albumdata["file"] = base_url + 'index.php\/my_account\/mdn\/' + $(this).attr("data-cid") + '\/' + streamType + '?stream_type=' + stream_type;
    //               console.log("Song Added in Queue [albumdata]");
    //               console.log(albumdata);
    //               console.log("ok: ");
    //             }
    //             jsonObj.push(albumdata);
    //         });
    //      }
    //     //added for popup contain update list
    //         $.each(shuffle(cdata['content']), function(index, value) {
    //             if ($contentCount == 1) {
    //                 initAudioPlayer("hungama_audioplayer", jsonObj, player_config_object);
    //             }
    //             $contentCount = $contentCount + 1;
    //             $contentCDNCount++;
    //             if ($contentCDNCount >= 20)
    //             {
    //                 return false;
    //             }
    //             if ($contentCDNCount == 9) {
    //                 $contentCDNCount = 1;
    //             }
    //             albumdataTemp = {};
    //             img = value['content_image_path'][0].replace('content.hungama.com', 'content' + $contentCDNCount + '.hungama.com');
    //             albumdataTemp['id_migration'] = value["content_id"];
    //             albumdataTemp['mediaid'] = value["content_id"];
    //             albumdataTemp["song_name"] = value['track'].replace(/[^a-zA-Z0-9 ]/g, "");
    //             albumdataTemp["date"] = '2015';
    //             albumdataTemp["singer_name"] = '';
    //             albumdataTemp["preview_link"] = '';
    //             albumdataTemp["album_image"] = img;
    //             albumdataTemp["album_name"] = value["album"].replace(/[^a-zA-Z0-9 ]/g, "");
    //             albumdataTemp["withCredentials"] = true;
    //             albumdataTemp["id_album"] = value["album_id"];
    //             albumdataTemp["file"] = base_url + 'index.php\/my_account\/mdn\/' + value["content_id"] + '\/' + streamType;
    //             //albumdataTemp["file"] = base_url + 'index.php\/my_account\/mdn\/' + value["content_id"] + '\/' + streamType + '?stream_type=' + stream_type;
    //             albumdataTemp["download_url"] = base_url + 'index.php/plan/package_download/81325/'+value["content_id"]+'/22/137630/Re1_Bollywood_Home/220/mixed/11094/Hungama Pick';
    //             albumdataTemp["img_src"] = img;
    //             albumdataTemp["lyrics"] = '';
    //             albumdataTemp["trivia"] = '';
    //             albumdataTemp["lyricist"] = '';
    //             albumdataTemp["contenttype"] = 'audioplaylist';
    //             albumdataTemp["type"] = stream_type;
    //             checkDuplicate(value["content_id"], is_popup);
    //             jsonObj.push(albumdataTemp);
    //         });
            
    //         console.log("load check");
    //         console.log("audio tag check " + $("#hungama_audio_player"));
    //         if (typeof $("#hungama_audio_player")[0] !== "undefined" && typeof soundLoaded == "function") {
    //                 console.log("load event added");
    //                 //$("#hungama_audio_player")[0].addEventListener("loadstart",soundLoaded,false);
    //         }
            
    //         initAudioPlayer("hungama_audioplayer", jsonObj, player_config_object);
            
    //         console.log("load check after init 2");
            
    //         repeatMode = "all";
        
    //         //songlist();
    // //        audio.play();
    //     }).error(function(error) {
    //         console.debug("get_playlist error" + error);
    //     }); 

        
    // }else{
        
    // }

    console.log("load check after");
    
    //cm_appEvent('page-loaded', {'path' : location.pathname, 'title' : page_title});

        // $("#search_txt").change(function (e) {
           
        //     var search_term_val = $(this).val();
        //     var current_title = $(document).attr('title');
        //     var extra = {search_term : search_term_val,'title' : current_title};
        //     cmsdk.reportAppEvent('search', extra);
        // }); 


        /*$(window).scroll(function(){

                if ($(document).height() == $(window).scrollTop() + $(window).height()) {
                    var current_title = $(document).attr('title');
                    var extra = {path : location.pathname, title : current_title};
                    cmsdk.reportAppEvent('page-scrolled', extra);
                }

        });*/

        //var cm_user_id =  $('#apiresult').val();
        
        //console.log('SNG user id '+cm_user_id);
        // if(cm_user_id != ""){
        //     cm_user_id_val = cm_user_id;
        // }

        // is_subcr_user = $('#is_subcr').val();
        // getUrlParameter(); //error code cm report

//        console.log("buffer object " + hap_audio);
        

        // buffer_test("page_load");


       
    
     
     
    
     
     

});

function soundLoaded(){
    console.log('soundLoaded');
    // buffer_test("sound_load");
}

function track_player_support(streamCheck,mp3Check,blnAllowPlayer){
    var api_url = base_url + "index.php/my_account/";
    $.ajax({
        url: api_url + "track_player_support/" + streamCheck + '/' +  mp3Check + '?b=' + blnAllowPlayer,
        method: 'POST'
    }).success(function(data) {
            
    }).error(function(error) {
        console.debug("get_playlist error" + error);
    });
}
function hap_ga_event(event_type, ga_obj) {

    log_event_name = event_type;
    log_event_label = '';
    log_song_duration = '';

    if (log_event_name == 'play')
    {
        return false;
        log_event_name = 'play';
        log_event_label = ga_obj.song_name + '_' + ga_obj.album_name + ' (' + ga_obj.content_id + ')';
    }

    if (log_event_name == 'pause')
    {
        log_event_name = 'pause';
        log_event_label = ga_obj.song_name + '_' + ga_obj.album_name + ' (' + ga_obj.content_id + ')';
    }
    if (log_event_name == 'resume')
    {
        log_event_name = 'resume';
        log_event_label = ga_obj.song_name + '_' + ga_obj.album_name + ' (' + ga_obj.content_id + ')';
    }

    if (log_event_name == 'song_ended')
    {
        log_event_name = 'complete';
        log_event_label = ga_obj.song_name + '_' + ga_obj.album_name + '(' + ga_obj.content_id + ') ';
        log_song_duration = ga_obj.song_duration;
    }

    if (log_event_name == 'skip_next')
    {
        log_event_name = 'override';
        log_event_label = ga_obj.song_name + '_' + ga_obj.album_name + '(' + ga_obj.content_id + ') ';
        log_song_duration = ga_obj.song_duration;
    }

    if (log_event_name == 'waiting')
    {
        // buffer_test("ga_event");
    }

    pushGaEvent('AudioStream', log_event_name, log_event_label, log_song_duration);
    console.log('triggered player GA ' + log_event_name + ' -- ' + log_event_label + ' -- ' + log_song_duration);

}




/*---- ~D~ New Player Events ----*/ 
// function hap_playing(){
//  var song_name = albumData[song_index]['song_name'];
//  var album_name = albumData[song_index]['album_name'];
//  var song_id = albumData[song_index]['id_migration'];
//  var log_song_duration = 0;
//  log_event_name = 'play';
//     log_event_label = song_name + '_' + album_name + ' (' + song_id + ')';
//  pushGaEvent('AudioStream', log_event_name, log_event_label, log_song_duration);
//  console.log("play event fired from hap_playing for " + song_name);
//     player1Obj.pause();
    
// }




function hap_songPaused(){
    var song_name = albumData[song_index]['song_name'];
    var album_name = albumData[song_index]['album_name'];
    var song_id = albumData[song_index]['id_migration'];
    var log_song_duration = hap_audio.currentTime;
    log_event_name = 'pause';
    log_event_label = song_name + '_' + album_name + ' (' + song_id + ')';
    pushGaEvent('AudioStream', log_event_name, log_event_label, log_song_duration);
    console.log("pause event fired from hap_playing for " + song_name + ' ' + log_song_duration);    
}

    function jw_audio_download(song_index){
        console.log("download Clicked");
        console.log("song Name: " + albumData[song_index].song_name);
        console.log("Content Id: " + albumData[song_index].id_migration);
        //your code to download file.
        console.log("Download Functionality");
        console.log(albumData[song_index]);
        console.log(albumData[song_index]["download_url"]);

        cm_downloadEvent(albumData[song_index],is_subcr_user);
        //window.location.href=albumData[song_index]["download_url"];
        window.open(albumData[song_index]["download_url"]);
    };
    
    function jw_audio_favourite(song_index){
        console.log("favourite Clicked");
        console.log("song Name: " + albumData[song_index].song_name);
        console.log("Content Id: " + albumData[song_index].id_migration);
    };
    
    function showPlaylist(){
        console.log("add to playlist Clicked");
        console.dir(albumData);
    };
    
    function show_loadPlayList(){
        console.log("load playlist Clicked");
        console.dir(albumData);
    };
    function jw_audio_info(song_index){
        console.log("Audio info Clicked");
        console.log("song Name: " + albumData[song_index].song_name);
        console.log("Content Id: " + albumData[song_index].id_migration);
    };
    
    function audio_quality_selection(qulaityVal){
        console.log("Quality value: " + qulaityVal);
    }
    
    function jw_getAutoNextSong(){
        console.log("next song please");
    }
    
    function hap_songEnded(){
        var song_name = albumData[song_index]['song_name'];
        var album_name = albumData[song_index]['album_name'];
        var song_id = albumData[song_index]['id_migration'];
        var log_song_duration = hap_audio.currentTime;
        log_event_name = 'complete';
        log_event_label = song_name + '_' + album_name + ' (' + song_id + ')';
        pushGaEvent('AudioStream', log_event_name, log_event_label, log_song_duration);
        console.log("song end event fired from hap_playing for " + song_name + ' ' + log_song_duration);
        //console.log("next song please");
    }
    
    function hap_songChanged(){
        
    }
    
    function jw_audio_share(songIndex){
        console.log("share Clicked");
        console.log("song Name: " + albumData[songIndex].song_name);
        console.log("Content Id: " + albumData[songIndex].id_migration);
    }
    function hap_showLyrics(){
        alert("lyrics");
    }
    
// -----
function jw_events(event_type, ga_obj) {

    log_event_name = event_type;
    log_event_label = '';
    log_song_duration = '';
    console.log("video stream GA");
    console.log(event_type);
    console.log(ga_obj);

    if (log_event_name == 'play')
    {
        log_event_name = 'play';
    }

    if (log_event_name == 'pause')
    {
        log_event_name = 'pause';
    }

    if (log_event_name == 'song_complete')
    {
        log_event_name = 'complete';
        log_song_duration = ga_obj.duration;
    }

    if (log_event_name == 'skip_next')
    {
        log_event_name = 'override';
        log_song_duration = ga_obj.duration;
    }
    if (log_event_name == 'resume')
    {
        log_event_name = 'resume';
    }

    if (log_event_name == 'song_complete')
    {
        log_event_label = ga_obj.title + '_' + ga_obj.album_name + ' (' + ga_obj.id_migration + ')';
    }
    else {
        log_event_label = ga_obj.item_details.title + '_' + ga_obj.item_details.album_name + ' (' + ga_obj.item_details.id_migration + ')';
    }


    pushGaEvent('VideoStream', log_event_name, log_event_label, log_song_duration);
    console.log('triggered VideoPlayer player GA ' + log_event_name + ' -- ' + log_event_label + ' -- ' + log_song_duration);
    console.log(ga_obj);
}
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

function emptyQueue() {
    albumData = [];
}
function CreateQueue(Obj) {
    if (Obj.length === 1) {
        addToQueue(Obj);
    } else {
        emptyQueue();
        addToQueue(Obj);
    }
    resetAudioConfig();
}

function resetAudioConfig() {
    hap_audio.pause();
    trackCount = albumData.length;
    configObj.autoStart = true;
    playing = true;
    songlist();
    song_index = 0;
    loadTrack(song_index);
}

function addToQueue(obj) {
    $contentCDNCount = 1;

    $.each(obj, function(index, value) {
        checkDuplicate(value["content_id"],0);
        albumdata = {};
        if ($contentCDNCount == 9) {
            $contentCDNCount = 1;
        }
        img = value['imgjpeg50'].replace('content.hungama.com', 'content' + $contentCDNCount + '.hungama.com');
        albumdata['id_migration'] = value["content_id"];
        albumdata["song_name"] = value['track'].replace(/[^a-zA-Z0-9 ]/g, "");
        albumdata["date"] = '2015';
        albumdata["singer_name"] = '';
        albumdata["preview_link"] = '';
        albumdata["album_image"] = img;
        albumdata["album_name"] = value["album_name"].replace(/[^a-zA-Z0-9 ]/g, "");
        albumdata["withCredentials"] = true;
        albumdata["id_album"] = value["album_id"];
        albumdata["file"] = api_url + 'mdn\/' + value["content_id"] + '\/' + streamType;
        albumdata["img_src"] = img;
        albumdata["lyrics"] = '';
        albumdata["trivia"] = '';
        albumdata["lyricist"] = '';
        albumdata["contenttype"] = '';
        albumdata["type"] = streamType;

        //albumData.unshift(albumdata);
        for (i = 0; i <= albumData.length; i++) {
            if (song_index == i) {
                albumDataNew.unshift(albumdata);
                continue;
            }
            if (song_index > i) {
                albumDataNew.unshift(albumData[i]);
                continue;
            }else{
                albumDataNew.unshift(albumData[i+1]);
            }
        }
        albumData = albumDataNew;

    });
}
/*To check the Duplicate Data Available in Queue*/
function checkDuplicate(content_id, is_popup) {
    if(is_popup == 1) {
        for (index in jsonObj) {
            if (jsonObj[index]['id_migration'] == content_id) {
                console.debug("Duplicate Found in popup");
                jsonObj.splice(index, 1);
                break;
            }
        }
    } else {
        for (index in albumData) {
            if (albumData[index]['id_migration'] == content_id) {
                console.debug("Duplicate Found");
                removeSongFromPlaylist(index); /*in case of duplicate remove the simmilar song from existing albumData */
                return true;
                break;
            }
        }
    }
    return false;
}

function removeSongFromPlaylist(index) { /*need to check working in all the browser */
    console.debug("remove Duplicate from main album");
    albumData.splice(index, 1);
}

function CreateVideoObject(obj) {
    temp_obj = obj;
    albumdataTemp = {};
    albumdataTemp['id_migration'] = obj.id;
    albumdataTemp["song_name"] = obj.title;
    albumdataTemp["date"] = '2015';
    albumdataTemp["singer_name"] = '';
    albumdataTemp["preview_link"] = '';
    albumdataTemp["album_image"] = obj["imagePaths"]["image-path-2"];
    albumdataTemp["album_name"] = obj.album["title"];
    albumdataTemp["id_album"] = obj.album["id"];
    albumdataTemp["withCredentials"] = true;
    albumdataTemp["img_src"] = obj["imagePaths"]["image-path-2"];
    albumdataTemp["lyrics"] = '';
    albumdataTemp["trivia"] = '';
    albumdataTemp["lyricist"] = '';
    albumdataTemp["contenttype"] = '';
    albumdataTemp["type"] = "hls";
    albumdataTemp["file"] = api_url+'streamMisEntry\/' + obj.id + '\/hls';
    return albumdataTemp;
}

function hp_download_mp3(id) {
    //your code to download file.
    console.log("Download Functionality");
    console.log(id);
    console.log(albumData[id-1]);
    console.log(albumData[id-1]["download_url"]);
    window.location.href=albumData[id-1]["download_url"];
}

function jw_Video_download(mediaID,meidaTitle) {
    console.log("Download Functionality - " + mediaID + ' - ' + meidaTitle);
    cm_downloadEvent(hls_video_playlist,is_subcr_user);
    var video_download_url = base_url + 'index.php/plan/package_download/126402/'+$("#content_id_from_url").val()+'/40/126402/Store_Video_Player_Page/220/mixed/11094/Hungama_Pick';
    if(video_download_url) {
        //window.location.href = video_download_url;
        window.open(video_download_url);
    }
}
var player1Obj, videoElem, vplayerLoaded, /*videoPlayListArr = [],*/hls_video_playlist = {"mediaid": 0}; 
var cnt = 17;
vplayerLoaded = false;
function play_video(obj) {
    console.log("in video play");
    $("#player_1").html("");
    player1Obj = null;
    result = JSON.parse(obj);
    console.log(obj);
    console.log(result);

    if (result.hasOwnProperty('login_url') && result.login_url != '') {

        window.location.href = result.login_url;
    }

    hls_video_type = my_video_player.getHlsType();

    vi_index = ideaVideoStreams.indexOf(result['cid']);
    if(0 > vi_index) {
        ideaVideoStreams.push(result['cid']);
    }
    checkIdeaCGRedirect();

    var isMute = true;

    if (!Hls.isSupported()) {

        isMute = false;
    }
    videoConfigObj_1 = {
        autoStart: true,
        mute: isMute,
        controls: true,
        playertype: "video",
        platform: "WEB",
        property: "hunga",
        notifyAutoPlaySec: 10,
        notifyAutoPlayText: "Starts in",
        loginStatus: true,
        userQuality: 'auto',
        subscribeStatus: true,
        extraParam: {
            viewingTime: -1
        }
    };
    console.log(videoConfigObj_1);
    hls_video_playlist = {
        "file": result['hls'],
        "mediaid": result['cid'],
        "title": result['title'],
        "albumname": result['albumname'],
        "type": hls_video_type,
        "genre": result['genre'],
        "contenttype": "movie",
        "image":$("#poster_url").val(),
        "spd": {
            "sprite_image_path": [{
                "path": $("#poster_url").val()
            }, {
                "path": $("#poster_url").val()
            }]
        }
        /*
        "ad_setup": {
            "client": "googima",
            "tag": "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpreonly&cmsid=496&vid=short_onecue&correlator="
        }
        */
    };
    console.log(hls_video_playlist);
    player1Obj = makePlayer("player_1", hls_video_playlist, videoConfigObj_1);           
    /*if(vplayerLoaded == false){
        player1Obj = makePlayer("player_1", hls_video_playlist, videoConfigObj_1);
        vplayerLoaded = true;
    }else{
        player1Obj.load(hls_video_playlist);
    }*/

    return false;
}

 var src_myflag = true;
 var src_myflag1 = true;

 var counter = 0;
function hap_song_srcLoaded(){
    
    
    var song_id = albumData[song_index]['id_migration'];
    var next_song_id = albumData[song_index+1]['id_migration'];
    if(song_id != next_song_id)
        secFlag = true;
    console.log("aakesh CatchMedia songid : " +song_id);
   
    
    var user_id = cm_user_id;
    counter++;

    
    $.ajax({
               url: api_url + "lostream?function=srcLoaded_beforecall"+"&param1="+song_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                console.log("stream load called success");
                console.log(data);
                /*var result = JSON.parse(data);
                if (result.hasOwnProperty('login_url') && result.login_url != '') {

                    console.log('+++++ HUN SD LIMIT EXCEEDS +++++', result);
                    window.location.href = result.login_url;
                }*/
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

     $.ajax({
			     url: "https://m.hungama.com/store/index.php/my_account/mdn/"+song_id+"/hls?po=yes",
                method: 'POST'
            }).success(function(data) {
                        console.log("po placed for "+song_id+"");
            }).error(function(error) {
                console.debug("error while placing po" + error);
            });

            cmsdk.reportMediaEvent(song_id, 'track','manual_play_start');
            
        
        $.ajax({
               url: api_url + "lostream?function=srcLoaded_aftercall"+"&param1="+song_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

         myflag = false;   

         console.log("aakesh userid "+user_id+ "count :" +counter);
         buffer_test("srcLoadFuntion",song_id,user_id);
         
     $.ajax({
               url: api_url + "lostream?function=hap_audio_play_beforecall"+"&param1="+song_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("hap_audio_play_beforecall");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

		//hap_audio.play();
        console.log("test_html5 called in src " + src_myflag);
            //if(src_myflag){
                console.log("test_html5 called in condition" + src_myflag);
                $("#hungama_audio_player").attr("data-mediaid", song_id);
                if(src_myflag1){
                    cm_html5_audio_new(hap_audio,user_id);
                    src_myflag1 = false;
                }
                hap_audio.addEventListener("timeupdate",function() {
                    console.log('SrcLoaded audio event Start'+hap_audio.currentTime);
                    if (parseInt(hap_audio.currentTime) == 2) {
                        console.log('Hungama Play event at 2 sec.'+hap_audio.currentTime);
                        cm_html5_audio_new(hap_audio,user_id);
                        //src_myflag = false;
                    }
                });
                        //cm_html5_audio_new(hap_audio, user_id);
            //}

            //src_myflag = false;
        console.log("test_html5 called in srcend " +src_myflag);

        $.ajax({
               url: api_url + "lostream?function=hap_audio_play_2_sec_interval"+"&param1="+song_id+"&param2="+navigator.connection.effectiveType+"|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                console.log("hap_audio_play_2_sec_interval");
            }).error(function(error) {
                console.debug("hap_audio_play_2_sec_interval_error" + error);
            });

        $.ajax({
               url: api_url + "lostream?function=hap_audio_play_aftercall"+"&param1="+song_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("hap_audio_play_aftercall");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });
     
}

var myflag = false;
function hap_playing(){
   
    console.log("after 2a");

    var song_id = albumData[song_index]['id_migration'];
    var next_song_id = albumData[song_index+1]['id_migration'];
    
    au_index = ideaMusicStreams.indexOf(song_id);
    if(0 > au_index) {
        ideaMusicStreams.push(song_id);
        var stream_flag = true; //check for 5 streaming logic
    }
    if(checkIdeaCGRedirect() == true){
        player1Obj.pause();
    }
    var song_name = albumData[song_index]['song_name'];
    var album_name = albumData[song_index]['album_name'];
    var log_song_duration = 0;
    log_event_name = 'play';
    log_event_label = song_name + '_' + album_name + ' (' + song_id + ')';
    
    $("#hungama_audio_player").attr("data-mediaid", albumData[song_index]['id_migration']);

    if(stream_flag){
        stream_flag = false;
        $.ajax({
           url: api_url + "freeStreamingLogic?function=srcLoaded_beforecall"+"&param1="+song_id,
            method: 'POST'
        }).success(function(data) {
            console.log("stream count success");
            console.log(data);
            var result = JSON.parse(data);
            if (result.hasOwnProperty('login_url') && result.login_url != '') {
                console.log('+++++ HUN SD LIMIT EXCEEDS +++++', result);
                window.location.href = result.login_url;
            }
        }).error(function(error) {
            console.debug("get_playlist error" + error);
        });
    }


    if(typeof(player1Obj) != 'undefined'){
        player1Obj.pause();
    }else{
        console.log("aakesh audio flag : " + myflag);
        if (!myflag) {
             //cm_html5_audio_new(hap_audio,cm_user_id);
             /*hap_audio.addEventListener("timeupdate",function() {
                console.log('Hungama Play event Start'+hap_audio.currentTime+'Song_id'+song_id);
                if ((parseInt(hap_audio.currentTime) == 2)) {
                    console.log('Hungama Play event at 2 sec.'+hap_audio.currentTime+'Song_id'+song_id);
                    cm_html5_audio_new(hap_audio,cm_user_id);
                }
            });*/
        }

         // $.ajax({
         //       url: api_url + "lostream?function=song_manual_media_event"+"&param1='"+song_id+"'&param2='"+user_id+"'&param3='|'&param4=hap_playing_start",
         //        method: 'POST'
         //    }).success(function(data) {
         //                console.log("stream load called success");
         //    }).error(function(error) {
         //        console.debug("get_playlist error" + error);
         //    });

         //    cmsdk.reportMediaEvent(song_id, "track", "manual_play_start");

         //     $.ajax({
         //       url: api_url + "lostream?function=song_manual_media_event"+"&param1='"+song_id+"'&param2='"+user_id+"'&param3='|'&param4=hap_playing_end",
         //        method: 'POST'
         //    }).success(function(data) {
         //                console.log("stream load called success");
         //    }).error(function(error) {
         //        console.debug("get_playlist error" + error);
         //    });

        // my_consumption_event(song_id);
        // console.log("aakesh consumtion event started");
        // consumptionEvent.start(0);
        console.log("after 2a");
        
        myflag = true;
        
    }
    
}

function jw_pause_evt(t, id) {
    console.log("GA-pause", id);
    //pushGaEvent('VideoStream', 'pause', id, player1Obj.getPosition());
}
function jw_videoStarted(t, id) {
    console.log("GA-play");
    //pushGaEvent('VideoStream', 'play', id, 0);
}
function jw_VideoComplete(t, id) {
    console.log("GA-ended");
    //pushGaEvent('VideoStream', 'complete', id, player1Obj.getPosition());

    console.log('@@@@@@@@@@@@@@@@@@@' + id);
    //nextVideo = getPlaylistVideo(id);
    //console.log('+++++++++++++++++' + nextVideo);
    // if(nextVideo >= 0){
    //     // var linkClicked = base_url + 'index.php/stream/' + nextVideo;
    //     // console.log("--->"+linkClicked);
    //     // sngAjax(linkClicked, 1);

    //     my_video_player.playNext(t, id, nextVideo);
    // }
}

function lp_video_srcLoaded(){

    console.log('+++++ VIDEO STREAM LOADED +++++');

    /*console.log("lp_video_srcLoaded function call");

    var video_id = hls_video_playlist.mediaid;
    console.log("aakesh CatchMedia songid : " +video_id);
   
    
    var user_id = cm_user_id;
    
     $.ajax({
               url: api_url + "lostream?function=lp_srcLoaded_beforecall"+"&param1="+video_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

            cmsdk.reportMediaEvent(hls_video_playlist.mediaid, 'video','manual_play_start');
            
        
        $.ajax({
               url: api_url + "lostream?function=lp_srcLoaded_aftercall"+"&param1="+video_id+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });*/
}

var myflag1 = false;
function jw_playing(player, id) {

    console.log('+++++ VIDEO STREAM PLAYING +++++');

    videoPlayerObj.addEventListener("timeupdate",function() {
        console.log('Hungama Play event Start'+videoPlayerObj.currentTime);
        if ((parseInt(videoPlayerObj.currentTime) == 2)) {
            console.log('Hungama Play event at 2 sec.'+videoPlayerObj.currentTime);
            
        }
    });

       //hap_audio.pause();

       //var user_id = cm_user_id;

       
    // if(videoPlayerObj.currentTime > 1){
    //    console.log("GA-resume");

    //    var user_type_val = $("#is_subcr").val();
    //     if(user_type_val == 1){
    //         var user_type = "subscribed";
    //     }else{
    //         var user_type = "free";
    //     }
    
    //     //pushGaEvent('VideoStream', 'resume', id, player1Obj.getPosition());

    //     //var stream_pos = Math.round(player1Obj.getPosition());
    //     //var extra = {'content_type' : 'video', "user_id":cm_user_id_val, "user_type":user_type, stream_position : stream_pos};
    //     //CatchMediaMediaEvent(hls_video_playlist.mediaid, 'video', 'resume', extra);
       
    // }
    //if (player == "video") {
        //console.log('paused - mp278');
        //console.log('aakesh video player play start');

         //$("#videoPlayerObj").attr("data-mediaid", hls_video_playlist.mediaid);
                
        //var user_id = cm_user_id;           
                // if (!myflag1){
                //         console.log('videoPlayerObj:check'+videoPlayerObj);
                //         //cm_html5_video(videoPlayerObj);
                //         //cm_html5_video_new(videoPlayerObj,user_id);
                //     }
                //     myflag1 = true; //for setupHtml5 issue fix

                    // cm manual playstart event for video start

        /*$.ajax({
            url: api_url + "lostream?function=jw_playing_video_beforecall"+"&param1="+hls_video_playlist.mediaid+"&param2='|'&param3='|'&param4="+user_id,
            method: 'POST'
        }).success(function(data) {
                    console.log("stream load called success");
        }).error(function(error) {
                    console.debug("get_playlist error" + error);
        });*/

            //cmsdk.reportMediaEvent(hls_video_playlist.mediaid, 'video','manual_play_start');
            
        
        /*$.ajax({
               url: api_url + "lostream?function=jw_playing_video_aftercall"+"&param1="+hls_video_playlist.mediaid+"&param2='|'&param3='|'&param4="+user_id,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                        console.debug("get_playlist error" + error);
            });*/
    //}
}
function get_playlist(url, streamingType) {
    return JSON.parse('[{"file":"' + url.replace(/\r?\n|\r/g, "") + '","type": "' + streamingType + '"}]');
}
function VideoplayerInit(content_id) {
    console.log("videoplayer init");
    myflag1 = false;
    $('.loading').hide();
    
    if (content_id != '' && content_id > 0) {
        content_id_from_url = content_id;
    } else {
        content_id_from_url = $("#content_id_from_url").val();
    }

    if (content_id_from_url == '' || typeof content_id_from_url === "undefined") {

        content_id_from_url = '29166941';
    }

    console.log('hungamaplayer: content id passed ----->', content_id);
    console.log('hungamaplayer: content id transformed ----->', content_id_from_url);
    console.log('hungamaplayer: stream url ----->', base_url + "index.php/my_account/streamMisEntry/"+content_id_from_url+ '/hls');

    console.log(base_url + "index.php/my_account/streamMisEntry/"+content_id_from_url+ '/hls');
     jQuery.ajax({
            url: base_url + "index.php/my_account/streamMisEntry/"+content_id_from_url+ '/hls',
            async:false,
            success: function(result) {
                //result = JSON.parse(result);
                console.log(result);
                //albumdata["file"] = result['hls'];
                 //video_playlist = {"album_name": albumdata["album_name"],"id_migration": albumdata["id_migration"] ,"file": albumdata["file"], "type": hls_video_type, "title": content_title , "image":image, "mediaid": "24564361"};
                //my_video_player.video_obj = result;
                play_video(result);
                $('#img_cg').show();
            },
        });

    
}

function getUrlParameter() {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            
        if (sParameterName[0] === 'err') {
            
            var extra = {error_code : sParameterName[1],path : location.pathname, 'title' :page_title};
            cm_appEvent('page_error', extra);
            }
        }
};
function VideoContentTypeMappingFunction(mediaid){
        return "video";
}

function AudioContentTypeMappingFunction(mediaid){
       return "track";
}

function videoMappingToExtraDataFunction(mediaId) {

    
    var user_type_val = $("#is_subcr").val();
    if(user_type_val == 1){
        var user_type = "subscribed";
    }else{
        var user_type = "free";
    }
    
    //var extra = {"content_type":hls_video_playlist.contenttype, "user_id":cm_user_id_val, "user_type":user_type};

    var extra = {"content_type":'video', "user_id":cm_user_id_val, "user_type":user_type};
    return extra;
}

function audioMappingToExtraDataFunction(mediaId) {
    
    
    var song_name = albumData[song_index]['song_name'];
    var album_name = albumData[song_index]['album_name'];
    var song_id = albumData[song_index]['id_migration'];
    var user_type_val = $("#is_subcr").val();
    if(user_type_val == 1){
        var user_type = "subscribed";
    }else{
        var user_type = "free";
    }
    
    var extra = {"playlist_id":albumData[song_index]['playlist_id'], "playlist_name":albumData[song_index]['playlist_name'], "user_id":cm_user_id_val, "user_type":user_type};
    // var extra = {playlist_id:'123456'};

    //var extra1 = albumData[song_index]['playlist_id']+' | '+albumData[song_index]['playlist_name']+'  | '+cm_user_id_val+' |  '+user_type;

    
        
        return extra;
}

function getPlaylistVideo(contentId,loadNext){
    videoIndex = -1;
    console.log('getPlaylistVideo param passed ==============', contentId, loadNext);
    if(loadNext === undefined || loadNext === true || typeof loadNext === "undefined"){
        loadNext = true;
    }else{
        loadNext = false;
    }
    console.log('loadNext ==============', loadNext);
    console.log('videoPlayListArr ==============', videoPlayListArr);
    $.each(videoPlayListArr, function(index, value) {
        if(parseInt(value) == parseInt(contentId)){
            videoIndex = index;
        }
    });
    vCid = 0;
    if(loadNext){
        vCid = videoPlayListArr[videoIndex+1];
    }else{
        vCid = videoPlayListArr[videoIndex-1];
    }

    console.log('vCid ==============', vCid);

    return vCid;
}
function jw_video_player_previous_button_clicked(id){
    //console.log(mp4_video_playlist_loaded.mediaid);
    prevVideo = getPlaylistVideo(hls_video_playlist.mediaid, false);
    console.log(prevVideo);
    if(prevVideo > 0){
        
        var linkClicked = '';

        if (global_page_id == '120738' || global_page_id == '81345' || global_page_id == '97088' || global_page_id == '121439' || global_page_id == '121174') {
            linkClicked = base_url + 'index.php/page/'+global_page_id+'?in=10&stream_content=' + prevVideo;

        } else {

            linkClicked = base_url + 'index.php/stream/' + prevVideo;
        }
        console.log("--->"+linkClicked);
        sngAjax(linkClicked, 1);
    }
}
function jw_video_player_next_button_clicked(id){
    //console.log(mp4_video_playlist_loaded.mediaid);
    nextVideo = getPlaylistVideo(hls_video_playlist.mediaid, true);
    console.log(nextVideo);
    if(nextVideo > 0){
        
        var linkClicked = '';

        if (global_page_id == '120738' || global_page_id == '81345' || global_page_id == '97088' || global_page_id == '121439' || global_page_id == '121174') {

            linkClicked = base_url + 'index.php/page/'+global_page_id+'?in=10&stream_content=' + nextVideo;

        } else {

            linkClicked = base_url + 'index.php/stream/' + nextVideo;
        }

        console.log("--->"+linkClicked);
        sngAjax(linkClicked, 1);
    }
}
function generateVideoPlaylistArr(newVideoContentIds){
    
    currentVideo = 0;
    if(hls_video_playlist !== undefined && hls_video_playlist.mediaid !== undefined){
        currentVideo = hls_video_playlist.mediaid;
    }
    console.log('+++++++++'+newVideoContentIds);
    videoPlayListArrTemp = [];
    video_index = videoPlayListArr.indexOf(currentVideo);
    console.log('-----------'+videoPlayListArr);
    console.log('====='+video_index);
    var j = 0;
    if(0 > video_index) {
        $.each(videoPlayListArr, function(a,b){
            videoPlayListArrTemp.push(b);
            j++;
        });
        if(currentVideo > 0){
            videoPlayListArrTemp.push(currentVideo);
            j++;
        }
    }
    console.log('videoPlayListArrTemp');
    console.log(videoPlayListArrTemp);
    
    $.each(newVideoContentIds, function(a,b){
        if(videoPlayListArrTemp.indexOf(b) < 0/* && videoPlayListArr.indexOf(b) < 0*/){
            videoPlayListArrTemp.push(b);
            j++;
        }
    });

    if(0 < video_index) {
        videoPlayListArr.reverse();
        $.each(videoPlayListArr, function(a,b){
            if(videoPlayListArrTemp.indexOf(b) < 0){
                videoPlayListArrTemp.unshift(b);
                j++;
            }
        });
    }
    
    console.log('videoPlayListArrTemp');
    console.log(videoPlayListArrTemp);
    return videoPlayListArrTemp;

}

function jw_adComplete(){
    console.log("player: complete here 1 disable play icon");
    $(".jw-playBtn").hide();
}

var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};


function buffer_test(type,songid,user_id){
    if(typeof(songid) == 'undefined' || songid == ''){
        songid="34662300";
    }
    // var song_id = albumData[song_index]['id_migration'];

    // if(song_id == ""){
    //       song_id =  '34662300';
    // }

    if(hap_audio){


      $.ajax({
               url: api_url + "lostream?function=song_buffer_init"+"&param1='"+songid+"'&param2='"+user_id+"'&param3='|'&param4="+type,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

    hap_audio.addEventListener('waiting', function () {


        //var song_id = albumData[song_index]['id_migration'];
         var myflag = true;
         $.ajax({
               url: api_url + "lostream?function=song_buffer_waiting"+"&param1='"+songid+"'&param2='"+user_id+"'&param3='|'&param4="+type,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

            $("#hungama_audio_player").attr("data-mediaid", songid);
   
             // if (myflag) {

             //        cm_html5_audio_new(hap_audio,user_id);
             //    }
     
             $.ajax({
               url: api_url + "lostream?function=song_buffer_media_event"+"&param1='"+songid+"'&param2='"+user_id+"'&param3='|'&param4="+type,
                method: 'POST'
            }).success(function(data) {
                        console.log("stream load called success");
            }).error(function(error) {
                console.debug("get_playlist error" + error);
            });

    });
       
}
myflag = false;
}


function my_consumption_event(mediaId){

var mediaId = mediaId;

var extra = {key1 : 'custom_consumption_event'};
var deliveryId = null;
var startPosition = 0;
var recordForReadInterval = 1;
var lifeTimeDays = 30;


consumptionEvent = cmsdk.createConsumptionEvent(mediaId, "track", "stream", extra, deliveryId, recordForReadInterval, lifeTimeDays);
}

         
