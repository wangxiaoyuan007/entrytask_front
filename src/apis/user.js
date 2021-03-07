import request from '../services/request'

export const getUserList = (pageNum, pageSize) => request.get('/api/v2/users',{
   params: {
      pageNum: pageNum,
      pageSize: pageSize
   }
})

export const login = (account, password) => {
   return  request.post('/api/v2/login', {account: account, password: password},{
   })
}

export const registerUser = ({account, password, avatar, nickname}) => {
   return  request.post('/api/v2/user/add',
       {account: account, password: password, avatar: avatar, nickname: nickname},
       {
          headers: {
             'Content-Type': 'application/json'
          },
           transformRequest:[function (data) {
               // 对 data 进行任意转换处理
               data = JSON.stringify(data)
               return data;
           }],
       })
}

export const updateUser = ({id, account, password, avatar, nickname}) => {
   return  request.post('/api/v2/user/update',
       {id: id, account: account, password: password, avatar: avatar, nickname: nickname},
       {
          headers: {
             'Content-Type': 'application/json'
          },
          transformRequest:[function (data) {
               // 对 data 进行任意转换处理
               data = JSON.stringify(data)
               return data;
          }],
       })
}

export const deleteUser = (id) => {
   return  request.get('/api/v2/user/delete',{
      params:{
         id: id,
      }
   })
}

export const logout = () => {
   return  request.get('/api/v2/logout')
}

export const uploadImage = (formData) => {
    return  request.post('/api/v2/upload',
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
}
