import Axios from 'axios';
import Mock from 'axios-mock-adapter';

const axios = Axios.create({
  
});

const axiosMock = new Mock(axios, {
  onNoMatch: 'throwException',
});

axiosMock.onGet(/\/v1.0\/token\?grant_type=1/).reply(200, {
  result: {
    access_token: 'c5b8e7f847d1382d242e90a93be291cc',
    expire_time: 3060,
    refresh_token: '7245ecbc34f0fc8344e2495291342145',
    uid: 'sh1548057511982g5FNI'
  },
  success: true,
  t: 1615272320570
});

axiosMock.onGet(/\/v1.0\/token\/7245ecbc34f0fc8344e2495291342145/).reply(200, {
  result: {
    access_token: 'c5b8e7f847d1382d242e90a93be291cc',
    expire_time: 3060,
    refresh_token: '7245ecbc34f0fc8344e2495291342145',
    uid: 'sh1548057511982g5FNI'
  },
  success: true,
  t: 1615272320570
});

axiosMock.onGet(/\/v1.0\/iot-02\/assets\/mock-id/).reply(200, {
  result: {
    asset_id: "资产id",
    parent_asset_id: "父级ID，最顶级为-1",
    asset_name: "资产名称",
    asset_full_name: "资产完整名称"
  },
  success: true,
  t: 1615117386906
});

axiosMock.onGet(/\/v1.0\/iot-02\/assets/).reply(200, {
  result: [{
    asset_id: "资产id",
    parent_asset_id: "父级ID，最顶级为-1",
    asset_name: "资产名称",
    asset_full_name: "资产完整名称"
  }],
  success: true,
  t: 1615117386906
});

axiosMock.onGet(/\/v1.0\/iot-02\/assets\/mock-id\/sub-assets/).reply(200, {
  result: {
    assets: [{
        asset_id: "资产id",
        parent_asset_id: "父级ID，最顶级为-1",
        asset_name: "资产名称",
        asset_full_name: "资产完整名称"
    }],
    page_size: "每页大小",
    has_next: true // 是否有下一页，true有，false没有
  },
  success: true,
  t: 1615117386906
});
  
axiosMock.onGet(/\/v1.0\/iot-02\/assets\/mock-id\/devices/).reply(200, {
    "result": {
      "list": [{
        "device_id": "设备id",
        "asset_id": "设备位置id",
        "asset_name": "房间名称"
      }],
      "last_row_key": "最后一条记录id",
      "page_size": "每页大小",
      "has_next": true
    },
    "success": true,
    "t": 1615117386906
  });

axiosMock.onPost(/\/v1.0\/iot-02\/assets/).reply(200, {
  result: "assetId",
  success: true,
  t: 1615117386906
});


  axiosMock.onPut(/\/v1.0\/iot-02\/assets\/mock-id/).reply(200, {
    "result": "assetId",
    "success": true,
    "t": 1615117386906
  });

  axiosMock.onDelete(/\/v1.0\/iot-02\/assets\/mock-id/).reply(200, {
    "result": true, // 成功为true，失败为false,
    "success": true,
    "t": 1615117386906
  });


  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/logs/).reply(200, {
    "success": true,
    "t": 1561344464370,
    "result": {
      "logs": [
        {
          "code": "switch_1",
          "value": "false",
          "event_time": 1560872567955,
          "event_from": "1",
          "event_id": 7
        },
        {
          "code": "switch_1",
          "value": "false",
          "event_time": 1560783276382,
          "event_from": "1",
          "event_id": 7
        }
      ],
      "device_id": "75500780ecfabc9a****",
      "has_next": true,
      "last_row_key": "xxxxxxxxxxxxx",
      "total": 2,
    }
  });


  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/report-logs/).reply(200, {
    "success": true,
    "t": 1561344464370,
    "result": {
      "logs": [
        {
          "code": "switch_1",
          "value": "false",
          "event_time": 1560872567955,
          "event_from": "1",
          "event_id": 7
        },
        {
          "code": "switch_1",
          "value": "false",
          "event_time": 1560783276382,
          "event_from": "1",
          "event_id": 7
        }
      ],
      "device_id": "75500780ecfabc9a****",
      "has_next": true,
      "last_row_key": "xxxxxxxxxxxxx",
      "total": 2,
    }
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/status/).reply(200, {
         "success": true,
     "t": 1545447665981,
     "result": [
         {
             "code": "switch_led",
             "value": true
         },
         {
             "code": "colour_data",
             "value": "{\"h\":37.0,\"s\":255.0,\"v\":189.0}"
         },
         {
             "code": "flash_scene_3",
             "value": ""
         },
         {
             "code": "flash_scene_4",
             "value": "{\"bright\":255,\"frequency\":80,\"hsv\":[{\"h\":0.0,\"s\":255.0,\"v\":255.0},{\"h\":120.0,\"s\":255.0,\"v\":255.0},{\"h\":240.0,\"s\":255.0,\"v\":255.0},{\"h\":300.0,\"s\":255.0,\"v\":255.0},{\"h\":240.0,\"s\":255.0,\"v\":255.0},{\"h\":0.0,\"s\":255.0,\"v\":255.0}],\"temperature\":255}"
         }
     ]
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/status/).reply(200, {
    "success": true,
    "t": 1545447665981,
    "result": [
      {
        "id":"xxxxx",
        "status":[
          {
            "code": "switch_led",
            "value": true
          },
          {
            "code": "colour_data",
            "value": "{\"h\":37.0,\"s\":255.0,\"v\":189.0}"
          },
          {
            "code": "flash_scene_3",
            "value": ""
          },
          {
            "code": "flash_scene_4",
            "value": "{\"bright\":255,\"frequency\":80,\"hsv\":[{\"h\":0.0,\"s\":255.0,\"v\":255.0},{\"h\":120.0,\"s\":255.0,\"v\":255.0},{\"h\":240.0,\"s\":255.0,\"v\":255.0},{\"h\":300.0,\"s\":255.0,\"v\":255.0},{\"h\":240.0,\"s\":255.0,\"v\":255.0},{\"h\":0.0,\"s\":255.0,\"v\":255.0}],\"temperature\":255}"
          }
        ]
      }
    ]
  });

  axiosMock.onGet(/\/v1.0\/iot-02\/users\/mock-id/).reply(200, {
    "result": {
      "user_id": "涂鸦用户id",
      "user_name": "管理用户登录名",
      "country_code": "国家编码"
    },
    "success": true,
    "t": 1615117386906
  });


  axiosMock.onPost(/\/v1.0\/iot-02\/users/).reply(200, {
    "result": {
      "user_id": "涂鸦用户id"
    },
    "success": true,
    "t": 1615117386906
  });

  axiosMock.onDelete(/\/v1.0\/iot-02\/users\/mock-id/).reply(200, {
    "result": true, // true是成功，false失败
    "success": true,
    "t": 1615117386906
  });

  axiosMock.onPut(/\/v1.0\/iot-02\/users\/mock-id/).reply(200, {
    "result": true, // true是成功，false失败
    "success": true,
    "t": 1615117386906
  });

  axiosMock.onGet(/\/v1.0\/iot-02\/users/).reply(200, {
    "result": {
      "list": [{
        "user_name": "用户名称",
        "country_code": "国家码",
        "user_id": "用户id"
      }],
      "last_row_key": "",
      "page_size": 10
    },
    "success": true,
    "t": 1615117386906
  });


  axiosMock.onGet(/\/v1.1\/iot-03\/devices\/mock-id/).reply(200, {
    "success": true,
    "result": {
      "active_time": 1589505938,
      "category": "qt",
      "create_time": 1560827137,
      "icon": "smart/icon/15402589135gknz23xajb_0.png",
      "id": "60613135b121cddc294****",
      "ip": "120.198.****.****",
      "local_key": "3a9b50126fe473****",
      "name": "体脂秤",
      "online": true,
      "asset_id": "1070****",
      "product_id": "g0er6hSKgMqr****",
      "product_name": "Wifi scales_OEM",
      "sub": false,
      "time_zone": "+08:00",
      "uid": "ay157896239864843g****",
      "update_time": 1589764585,
      "uuid": "60613135b23cddc294****"
    }
  });

  axiosMock.onGet(/\/v1.2\/iot-03\/devices\?device_ids=mock-id/).reply(200, {
    "success": true,
    "result": {
      "active_time": 1589505938,
      "category": "qt",
      "create_time": 1560827137,
      "icon": "smart/icon/15402589135gknz23xajb_0.png",
      "id": "60613135b121cddc294****",
      "ip": "120.198.****.****",
      "local_key": "3a9b50126fe473****",
      "name": "体脂秤",
      "online": true,
      "asset_id": "1070****",
      "product_id": "g0er6hSKgMqr****",
      "product_name": "Wifi scales_OEM",
      "sub": false,
      "time_zone": "+08:00",
      "uid": "ay157896239864843g****",
      "update_time": 1589764585,
      "uuid": "60613135b23cddc294****"
    }
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices/).reply(200, {
    "result": {
      "devices": [
        {
          "active_time": 1584063323,
          "category": "znyxss",
          "create_time": 1575017570,
          "icon": "smart/program_category_icon/znyxss.png",
          "id": "747b2165d9449964****",
          "ip": "58.251.**.****",
          "local_key": "11d7f7286caa****",
          "model": "SS190",
          "name": "WiFi智能音箱 SS190",
          "online": false,
          "asset_id": "1160****",
          "product_id": "i9vkzktd",
          "product_name": "WiFi智能音箱 SS190",
          "sub": false,
          "time_zone": "+08:00",
          "uid": "ay156531946658X****",
          "update_time": 1584939489,
          "uuid": "12****"
        }
      ],
      "last_row_key": "xxxxxx",
      "has_more":false,
      "total": 1
    },
    "success": true,
    "t": 1586741851210
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/devices\/mock-id\/actions\/reset/).reply(200, {
    "success": true,
    "t": 1550642917632,
    "result": true
  });

  axiosMock.onDelete(/\/v1.0\/iot-03\/devices\/mock-id/).reply(200, {
    "success": true,
    "t": 1550642917632,
    "result": true
  });


  axiosMock.onDelete(/\/v1.0\/iot-03\/devices/).reply(200, {
    "success": true,
    "t": 1550642917632,
    "result": true
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/sub-device/).reply(200, {
        "result": [
        {
            "active_time": 1586169374,
            "category": "sj",
            "id": "6c0746cfe887e21e8b****",
            "name": "水浸警报",
            "online": true,
            "asset_id": "1059****",
            "product_id": "rzeSU2h9uoklxEwq",
            "update_time": 1586169379
        }
    ],
    "success": true,
    "t": 1586169580204
  });

  axiosMock.onPut(/\/v1.0\/iot-03\/devices\/mock-id/).reply(200, {
        "t":1234876331,
    "success":true,
    "result": true
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/freeze-state/).reply(200, {
        "t":1234876331,
    "success":true,
    "result": {
        "state":1
    }
  });

  axiosMock.onPut(/\/v1.0\/iot-03\/devices\/mock-id\/freeze-state/).reply(200, {
        "t":1234876331,
    "success":true,
    "result": true
  });


  axiosMock.onGet(/\/v1.0\/iot-03\/assets\/mock-id\/devices/).reply(200, {
        "result": [
        {
            "id": "002008535ccf7f53****"
        }
    ],
    "success": true,
    "t": 1585619435816
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/categories\/kg\/functions/).reply(200, {
        "success": true,
    "t": 1571293457435,
    "result": {
        "category": "kg",
        "functions": [
            {
                "name": "开关",
                "desc": "总开关,true:打开所有;false:关闭所有",
                "code": "switch",
                "type": "Boolean",
                "values": "{}"
            },
            {
                "name": "开关1倒计时",
                "desc": "开关1倒计时",
                "code": "countdown_1",
                "type": "Integer",
                "values": "{\"unit\":\"s\",\"min\":0,\"max\":86400,\"scale\":0,\"step\":1}"
            }
        ]
    }
  });

  axiosMock.onGet(/\/v1.0\/iot-03\/devices\/mock-id\/functions/).reply(200, {
        "success": true,
    "t": 1571293776551,
    "result": {
        "category": "cz",
        "functions": [
            {
                "name": "开关",
                "desc": "开关",
                "code": "switch_1",
                "type": "Boolean",
                "values": "{}"
            },
            {
                "name": "开关1倒计时",
                "desc": "开关1倒计时",
                "code": "countdown_1",
                "type": "Integer",
                "values": "{\"unit\":\"s\",\"min\":0,\"max\":86400,\"scale\":0,\"step\":1}"
            }
        ]
    }
  });
  axiosMock.onGet(/\/v1.2\/iot-03\/devices\/mock-id\/specification/).reply(200, {
       "success":true,
    "t":1571201730542,
    "result":{
        "category":"dj",
        "functions":[
            {
                "code":"switch_led",
                "type":"Boolean",
                "values":"{}"
            },
            {
                "code":"work_mode",
                "type":"Enum",
                "values":"{\"range\":[\"colour\"]}"
            },
            {
                "code":"bright_value",
                "type":"Integer",
                "values":"{\"min\":0,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1}"
            },
            {
                "code":"colour_data",
                "type":"Json",
                "values":"{\"h\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":360,\"step\":1},\"s\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1},\"v\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1}}"
            }
        ],
        "status":[
            {
                "code":"switch_led",
                "type":"Boolean",
                "values":"{}"
            },
            {
                "code":"work_mode",
                "type":"Enum",
                "values":"{\"range\":[\"colour\"]}"
            },
            {
                "code":"bright_value",
                "type":"Integer",
                "values":"{\"min\":0,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1}"
            },
            {
                "code":"colour_data",
                "type":"Json",
                "values":"{\"h\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":360,\"step\":1},\"s\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1},\"v\":{\"min\":1,\"scale\":0,\"unit\":\"\",\"max\":255,\"step\":1}}"
            }
        ]
    }
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/devices\/mock-id\/commands/).reply(200, {
    "success":true,
    "t":1551851043862,
    "result":true
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/device-registration\/token/).reply(200, {
    "result": {
      "expire_time": 300,
      "extension": {
        "encrypt_key": "101xxxxxxx189f",
        "random": "fa2fxxxxxxxxcb38c"
      },
      "region": "AY",
      "secret": "pr_0",
      "token": "H73H8u7A"
    },
    "success": true,
    "t": 1591257455025
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/device-registration\/tokens\/mock-token/).reply(200, {
        "result":{
        "error_devices":[
 
        ],
        "success_devices":[
            {
                "category":"td",
                "id":"6c4b088a4116ae16c****",
                "name":"华硕",
                "product_id":"sfclyxhrfnys****",
                "lon":"120.0",
                "lat":"30.0",
                "online":true,
                "uuid":"xxxxx",
                "ip":"120.0.0"
            }
        ]
    },
    "success":true,
    "t":1591872112140
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/device-registration\/devices\/mock-id\/actions\/discover/).reply(200, {
        "result":{
        "error_devices":[
 
        ],
        "success_devices":[
            {
                "category":"td",
                "id":"6c4b088a4116ae16c****",
                "name":"华硕",
                "product_id":"sfclyxhrfnys****",
                "lon":"120.0",
                "lat":"30.0",
                "online":true,
                "uuid":"xxxxx",
                "ip":"120.0.0"
            }
        ]
    },
    "success":true,
    "t":1591872112140
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/device-registration\/devices\/mock-id\/actions\/stop-discover/).reply(200, {
        "success":true,
    "t":1551863646940,
    "result":true
  });

  axiosMock.onPost(/\/v1.0\/iot-03\/device-registration\/devices\/mock-id\/sub-devices/).reply(200, {
        "result":[
        {
            "active_time":1566973357,
            "update_time":1566973363,
            "asset_id":"5583425******",
            "product_id":"tob46aoq******",
            "name":"烟雾报警器",
            "online":true,
            "id":"xxxxx",
            "category":"ywbj"
        }
    ],
    "t":1566973373639,
    "success":true
  });
export {
  axios,
  axiosMock,
};

