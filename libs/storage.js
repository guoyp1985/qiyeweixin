const Token = {
  set (token) {
    if (!token) return
    localStorage.setItem('utoken', JSON.stringify(token))
  },
  get () {
    return JSON.parse(localStorage.getItem('utoken'))
  },
  remove () {
    const token = Token.get()
    if (token) {
      localStorage.removeItem('utoken')
    }
  },
  isExpired () {
    const token = Token.get()
    if (token) {
      const expired = new Date(token.expired_at).getTime()
      const now = new Date().getTime()
      return now > expired
    }
    return false
  }
}
const User = {
  set (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  get () {
    if (localStorage.getItem('user') === 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('user'))
  },
  remove () {
    const user = User.get()
    if (user) {
      localStorage.removeItem('user')
    }
  }
}
const Access = {
  set (access) {
    localStorage.setItem('access', access)
  },
  get () {
    return localStorage.getItem('access')
  },
  remove () {
    const access = Access.get()
    if (access) {
      localStorage.removeItem('access')
    }
  }
}
const WxAccess = {
  set (access) {
    localStorage.setItem('wxAccess', access)
  },
  get () {
    const res = localStorage.getItem('wxAccess')
    return (res === null || res === 'false') ? false : true
  },
  remove () {
    const access = WxAccess.get()
    if (access) {
      localStorage.removeItem('wxAccess')
    }
  }
}
const Version = {
  set (version) {
    localStorage.setItem('version', version)
  },
  get () {
    return localStorage.getItem('version')
  },
  remove () {
    const version = Version.get()
    if (version) {
      localStorage.removeItem('version')
    }
  }
}
const MenuData = {
  set (menu) {
    localStorage.setItem('menu', JSON.stringify(menu))
  },
  get () {
    if (localStorage.getItem('menu') === 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('menu'))
  },
  remove () {
    const menu = MenuData.get()
    if (menu) {
      localStorage.removeItem('menu')
    }
  }
}

export { Token, User, Access, WxAccess, Version, MenuData }
