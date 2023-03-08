import request from "@/utils/request";



export function getSGeographyById(id) {
  return request.get('/sGeography/'+id,null,{
	login: true
  })
}

export function getSGeographys() {
  return request.get('/sGeography',null,{
	login: true
  })
}

export function addGeography(data) {
  return request.post('/sGeography',data,{
	login: true
  })
}

export function delGeography(ids) {
  return request.post('/sGeography/delete',ids,{
	login: true
  })
}

export function editGeography(data) {
  return request.put('/sGeography',data,{
	  login: true
  })
}


export function getAddressByLatLng(lat,lng) {
  var data={'lat':lat,'lng':lng}
  return request.post("/sGeography/address/", data, {
  	login: true
  });
}

export function getLatLngByAddress(address) {
  var data = {'address': address }
  return request.post("/sGeography/latLng/", data, {
  	login: true
  });
}





/**
 * 跌倒报警器
 */

export function getDTumbleById(id) {
  return request.get('/dTumble/'+id,null,{
	login: true
  })
}

export function getDTumbles() {
  return request.get('/dTumble',null,{
	login: true
  })
}

export function addDTumble(data) {
  return request.post('/dTumble',data,{
	login: true
  })
}

export function delDTumble(ids) {
  return request.post('/dTumble/delete',ids,{
	login: true
  })
}

export function editDTumble(data) {
  return request.put('/dTumble',data,{
	  login: true
  })
}





/**
 * 手环列表
 */
export function getDWatchs() {
  return request.get('/dWatch',null,{
	  login: true
  })
}

export function getDWatchById(id) {
  return request.get('/dWatch/'+id,null,{
	login: true
  })
}

export function configHr(data) {
  return request.put('/dWatch/configHr/',data,{
	  login: true
  })
}

export function configTemperature(data) {
  return request.put('/dWatch/configTemperature/',data,{
	  login: true
  })
}

export function configLocation(data) {
  return request.put('/dWatch/configLocation/',data,{
	  login: true
  })
}

export function configSleep(data) {
  return request.put('/dWatch/configSleep/',data,{
	  login: true
  })
}

export function configSOS(data) {
  return request.put('/dWatch/configSOS/',data,{
	  login: true
  })
}

export function configContacts(data) {
  return request.put('/dWatch/configContacts/',data,{
	  login: true
  })
}

export function getMyHistoryTrace(dateObj) {
  return request.get('/dWatch/getMyHistoryTrace',{
	  day:dateObj,
	  login: true
  })
}



//=============friends=======

export function addFriend(data) {
  return request.post('/sFriendsGroup/add/',data,{
	  login: true
  })
}

export function sendSMS(data) {
  return request.get('/sFriendsGroup/sendSMS/',data,{
		phone:data.phone,
		mainUid:data.mainUid,
	   login: true
  })
}


export function getFriendList() {
  return request.get('/sFriendsGroup/list',{
	  login: true
  })
}

export function deleteFriendById(ids) {
  return request.post('/sFriendsGroup/delete',ids,{
	  login: true
  })
}



//=========================健康数据统计=======================



export function getSleepDataByDay(dateObj,uid) {
  return request.get('/health/getSleepDataByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}


export function getHealthArticleTop5() {
  return request.get('/health/getHealthArticleTop5',{
	  login: true
  })
}


export function getHealthArticlePage(start,pageSize) {
  return request.get('/health/getHealthArticlePage',{
	  start:start,
	  pageSize:pageSize,
	  login: true
  })
}


export function getBloodPreasureByDay(dateObj,uid) {
  return request.get('/health/getBloodPreasureByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}



export function getHeartRateByDay(dateObj,uid) {
  return request.get('/health/getHeartRateByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}


export function getOxygenByDay(dateObj,uid) {
  return request.get('/health/getOxygenByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}



export function getTemperatureByDay(dateObj,uid) {
  return request.get('/health/getTemperatureByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}


export function getWeightByDay(dateObj,uid) {
  return request.get('/health/getWeightByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}


export function getBloodSugarByDay(dateObj,uid) {
  return request.get('/health/getBloodSugarByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}


export function getPulseRateByDay(dateObj,uid) {
  return request.get('/health/getPulseRateByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}



export function getEcgDataRecords(uid) {
  return request.get('/health/getEcgDataRecords',{
	  uid:uid,
	  login: true
  })
}


export function getUricAcidByDay(dateObj,uid) {
  return request.get('/health/getUricAcidByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}

export function getFallDownByDay(dateObj,uid) {
  return request.get('/health/getFallDownByDay',{
	  day:dateObj,
	  uid:uid,
	  login: true
  })
}



export function getHealthArticle(id) {
  return request.get('/health/getHealthArticle/'+id,{
	  login: true
  })
}


export function getRiskStateById(uid) {
  return request.get('/health/getRiskStateById/'+uid,{
	  login: true
  })
}

export function getAllHealthRecordData(uid) {
  return request.get('/health/getAllHealthRecordData/'+uid,{
	  login: true
  })
}