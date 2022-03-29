import request from 'request'

class Rutracker {
    constructor() {
        this.cookie = null
    }

    login(username, password) {
        const options = {
            url: 'http://rutracker.org/forum/login.php', 
            form: {
                login_username: username,
                login_password: password,
                login: 'Вход' //'%C2%F5%EE%E4'
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        }

        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error)
            } else {
                //console.log(response)
                const [cookie] = response.headers['set-cookie'][0].split(';')
                console.log(cookie)
                this.cookie = cookie

                const options = {
                    url: 'http://rutracker.org/forum/tracker.php',
                    form: {
                        nm: 'Отец Father',
                        o: '4', //sort downloads
                        s: '1' //asc order
                    },
                    headers: {
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Cookie': cookie, //+ ' opt_js={%22only_new%22:2}',
                        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0'
                    }
                }

                request.post(options, (error, response, body) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(response.data)
                    }
                })
            }
        })
    }
}

export default Rutracker