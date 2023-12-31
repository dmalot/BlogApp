export class User {


  constructor(public username: string, public email: string, public name: string, private _token: string) { }

   get token() {

    return this._token

  }

  set token(token: string) {
    this._token = token
  }





}
