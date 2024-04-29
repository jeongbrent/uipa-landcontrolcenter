import axios from 'axios'
import instance from '@/composables/useAxios.js'
import { getShipCondition } from '@/api/alarmApi'

export const getVoccListAll = () => {
  return instance({
    url  : '/vocc/get-all-admin-data',
    method : 'GET'
  })
}

/**
 * 선사 정보 조회
 * @param 
 * @returns
 */
export const getVoccInfo = () => {
  return instance({
    url : '/vocc/get-basic-info',
    method : 'GET',
  })
}
/**
 * 선사 기초 정보 수정
 * @param {*} editForm 
 * @returns 
 */
export const updateVoccInfo = (editForm) => {
  return instance({
    url : '/vocc/change-basic-info',
    method : 'POST',
    data : editForm
  })
}


/**
 * 선사 로고 업데이트
 * @param {} image 
 * @returns 
 */
export const updateVoccLogo = (image) => {
  return instance({
    url: '/vocc/update-basic-info-logo',
    method: 'POST',
    data: image,
    headers: {
      'Content-Type': 'application/octet-stream' // or appropriate content type
    }
  })
}

/**
 * 선사 관리자 정보를 입력받아 선사 관리자 가입 api 요청
 * @param {Object} registerForm 선사 관리자 정보
 */
export const registerVocc = (registerForm) => {
  registerForm.role = 'ROLE_VOCC_ADMIN'

  return instance({
    url: '/vocc/join-admin',
    method: 'POST',
    data: registerForm,
  })
}

export const getVoccAdmin = (voccAdminId) => {
  return axios.get('/api/vocc/get-admin-data?voccId=' + voccAdminId).then((response) => {
    return response.data.data
  })
}

/**
 * 관리자가 없는 선사 목록 조회 api 요청
 * @param {*} param
 * @returns
 */
export const getVoccsWithoutAdmin = () => {
  return instance({
    url: '/vocc/get-all-admin-data',
    method: 'GET',
  }).then((response)=> {
    const { data : { data } } = response
    if (data.length != 0) {
      const result = data.filter((admin) => admin.adminUsername == null || admin.adminUsername == '')
                         .map((admin) => admin.name)
      return result
    } else {
      return response.data
    }
  })
}

/**
 * DB에 등록된 선사 관리자 목록 조회 api 요청
 * @param {*} param
 * @returns
 */
export const getVoccAdminListAll = () => {
  return axios.get('/api/vocc/get-all-admin-data').then((response) => {
    if (response.data.data.length != 0) {
      const result = response.data.data
        .filter((admin) => admin.getUserData != null)
        .map((admin) => {
          let adminInfo = {
            id: admin.id,
            name: admin.name,
            username: admin.getUserData.username,
            nickname: admin.getUserData.nickname,
            email: admin.getUserData.email,
            role: admin.getUserData.role,
            activated: admin.getUserData.activated
          }

          return adminInfo
        })
      return result
    } else {
      return response.data
    }
  })
}

/**
 * 선사 관리자 삭제 
 * @param {} editForm 
 * @returns 
 */
export const deleteVoccAdmin = (removeVoccAdminInfo) => {
  return instance({
    url: '/vocc/remove-admin',
    method: 'POST',
    data: removeVoccAdminInfo
  })
}


/**
 * 선사 사용자 정보를 입력받아 선사 사용자 가입 api 요청
 * @param {Object} registerForm 선사사용자정보
 * @returns 등록 여부
 */
export const joinVoccUser = (registerForm) => {
  registerForm.role = 'ROLE_VOCC_USER'
  return axios.post('/api/vocc/join-user', registerForm)
}


/**
 * DB에 등록된 선사 사용자 목록 조회 api 요청
 * @param {*} param
 * @returns
 */
export const getVoccUserListAll = () => {
  return axios.get('/api/vocc/get-all-user-data').then((response) => {
    return response.data.data
  })
}

/**
 * 선사 사용자 정보 조회
 * @param {Number} voccUserId
 * @returns
 */
export const getVoccUser = (voccUserId) => {
  return axios.get('/api/vocc/get-user-data?userId=' + voccUserId).then((response) => {
    return response.data.data
  })
}

/**
 * 선사 사용자 삭제 
 * @param {} editForm 
 * @returns 
 */
export const deleteVoccUser = (removeVoccUserInfo) => {
  return axios
    .post('/api/vocc/remove-user', removeVoccUserInfo)
    .then((response) => {
      console.dir(response.data)
      return response.data
    })
    .catch((error) => console.error(error))
}

/**
 * 선사 관리자 / 사용자 계정 활성화 변경
 * @param {} userName, activate
 * @returns 
 */
export const changeUserActivate = (userName, activate) => {
  return axios
    .post(`/api/user/change-activate?username=${userName}&activate=${activate}`)
    .then((response) => {
      console.log(response)
    })
}


/**
 * 선사 관리자 / 사용자 권한 변경
 * @param {} userName, roleName
 * @returns 
 */
export const changeUserRole = (userName, userRole) => {
  return axios
    .post(`/api/vocc/change-user-role?username=${userName}&userRole=${userRole}`)
    .then((response) => {
      console.log(response)
    })
}



/**
 * 선사의 선단 및 선박 목록 조회
 */

export const getFleetAndShipByVocc = (voccids) => {
  return instance({
    url : '/vocc/get-fleet-list-by-menu',
    method : 'GET',
    params : { voccIdList : voccids}
  }).then((response)=> {
    const { data : { data } } = response
    const result = convertArray(data)
    return result
  })
}


const convertArray =  async(apiData) => {
  let convertData = []; 
  // const test = apiData.forEach(vocc => {
  for(let data of apiData){
    convertData.push({
      id: convertData.length + 1,
      parentId: 0,
      voccId: data.voccId,
      voccName: data.voccName,
      displayName: data.voccName,
      fleetId: "",
      fleetName: "",
      imoNumber: "",
      ShipName: "",
    });

    let voccId = convertData.length
    if(data.fleetDataList.length > 0){
        //  vocc.fleetDataList.forEach( fleet => {
        for(let  fleet of data.fleetDataList){

          let fleetId = ''
          if(fleet.fleetName != 'DEFAULT'){
            convertData.push({
              id: convertData.length + 1,
              parentId: voccId,
              voccId: data.voccId,
              voccName: data.voccName,
              fleetId: fleet.fleetId,
              fleetName: fleet.fleetName,
              displayName: fleet.fleetName,
              imoNumber: '',
              shipName: ''
            })
            fleetId = convertData.length;
          }else{
            fleetId = voccId;
          }
       
          if(fleet.shipDataList.length > 0 ){
            for (const ship of fleet.shipDataList) {
                // console.log(response[ship.imoNumber])
                const result =  await fetchShipCondition(ship.imoNumber)
                let alarmType = result[ship.imoNumber]
                convertData.push({
                  id: convertData.length + 1,
                  parentId: fleetId,
                  voccId: data.voccId,
                  voccName: data.voccName,
                  fleetId: fleet.fleetId,
                  fleetName: fleet.fleetName,
                  displayName: ship.shipName,
                  imoNumber: ship.imoNumber,
                  shipName: ship.shipName,
                  shipStatus : alarmType
                });
             
            }
          }

          }
    }
  }
    
  return convertData
}


export const fetchShipCondition = async (imoNumber) => {
  const result =  await getShipCondition(imoNumber.toString())
  return result
}