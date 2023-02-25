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