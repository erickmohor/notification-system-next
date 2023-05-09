import { api } from './api'


export interface ISignInRequestData {
  email: string
  password: string
}

export interface ISignInResponseData {
  token: string
  user: {
    _id: string,
    name: string,
    email: string,
    password_hash: string,
    role: string,
    createdAt: string,
    updatedAt: string,
  }
}


export function signIn(data: ISignInRequestData): Promise<ISignInResponseData> {
  return new Promise((resolve, reject) => {
    api.post('/auth', data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log('auth login error: ', error)
        reject(error)
      })
  })
}

export function recoverUserInformation(): Promise<any> {
  return new Promise((resolve) => {
    api.get('/me')
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log('auth recover error: ', error)
      })
  })
}