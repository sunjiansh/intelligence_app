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