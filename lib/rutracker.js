class Rutracker {
    async login(username, password) {
        try {
            const res = await fetch('http://rutracker.org/forum/login.php', {
                method: 'POST',
                data: JSON.stringify({
                    login_username: username,
                    login_password: password,
                    login: '%C2%F5%EE%E4'
                }),
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
                    'Accept-Encoding': 'gzip, deflate, br'
                }
            })

            console.log(res.status)
            const [cookie] = res.headers['set-cookie'][0].split(';')
            console.log(cookie)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default Rutracker