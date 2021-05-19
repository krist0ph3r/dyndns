const http = require('https');

function getData(url, action) {
    let data = ''
	const request = http.request(url, (response) => {
		response.on('data', (chunk)=> { // data is event name here
			data = data + chunk.toString();
		})

		response.on('end', () => {
			console.log(`GET ${url} -> ${data}`)
			action(data)
		})
	})

	request.on('error', (error) => {
		console.log('An erorr', error);
	})

	request.end();
}

getData('https://api.ipify.org/', ip => {
		getData(`https://www.clickip.de/userweb/krist0ph3r/update.php?ip=${ip}`, result => {
			console.log(result)
		})
	}
)