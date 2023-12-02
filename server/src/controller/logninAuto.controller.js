const { Builder, By, Key, until } = require('selenium-webdriver');
const axios = require('axios');
const bcrypt = require('bcrypt');

let like = 0;

/**
 * @option
 * @description: scroll+like, follower,
 */

const userInfo = [{ name: 'John', password: '', option: '' }];

const listFollower = [
	{ name: 'user1', danhsach: [1, 2, 3, 4, 5] },
	{ name: 'user2', danhsach: [1, 2, 3, 4, 5] },
];

const AutoSelenium = async (username, password) => {
	const driver = await new Builder().forBrowser('chrome').build();

	await driver.executeScript(
		"Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
	);
	try {
		await driver.get('https://www.instagram.com/accounts/login/');
		// Thực hiện đăng nhập - điều này chỉ mang tính chất minh họa và có thể vi phạm điều khoản sử dụng của Facebook
		const usernameInput = await driver.wait(
			until.elementLocated(By.name('username')),
			5000
		);
		const passwordInput = await driver.wait(
			until.elementLocated(By.name('password')),
			5000
		);
		await usernameInput.sendKeys(username, Key.RETURN);
		await passwordInput.sendKeys(password, Key.RETURN);
		console.log(username, password);
		// Chờ cho trang tải hoàn tất
		await driver.sleep(4000);
		await driver.get('https://www.instagram.com/');

		await driver.sleep(2000);

		// const notNowButton = await driver.findElement(By.xpath('//div[text()="Not Now"]'))
		const notNowButton = await driver.findElement(
			By.xpath('//button[contains(text(), "Not Now")]')
		);
		await driver.sleep(1000);
		if (notNowButton) {
			console.log('Element found. Performing click...');
			await notNowButton.click();
		}

		// Chờ một khoảng thời gian nếu cần thiết
		await driver.sleep(2000);
		let isShowAuto = true;
		while (isShowAuto) {
			try {
				await scrollWithRandomSpeedAndPosition(driver);
			} catch (error) {
				isShowAuto = false;
			}
		}
	} finally {
		// Đóng trình duyệt khi hoàn thành
		// await driver.quit();
	}
};

const optionsAutoFeature = (driver, username) => {
	/**
	 * for userInfo
	 * 	neu tìm dung nguoi
	 *    hàm option(userInfo.option)
	 */
};

/// vết hàm folow rieng

const scrollWithRandomSpeedAndPosition = async (driver) => {
	// Tạo một số ngẫu nhiên để làm tốc độ cuộn
	const scrollSpeed = parseInt(Math.random() * (500 - 100) + 100);
	const dy = parseInt(Math.random() * (500 - 10 + 1) + 300);

	console.log('dyyyyyyyyyyyyy:', dy);

	const sleep = parseInt(Math.random() * (1000 - 200 + 100) + 200);

	const isScrollUp = parseInt(Math.random() * (500 - 1 + 1) + 1);

	// Cuộn xuống dưới
	// await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
	try {
		await driver.actions().scroll(0, dy, 0, 70).perform();
	} catch (error) {
		console.log('quá chiều dài:', dy);
		await driver.actions().scroll(0, 0, 0, 50).perform();
	}

	// Tạm nghỉ

	await driver.sleep(sleep);
	let countScrollUp = 0;
	// Cuộn lên trên
	if (isScrollUp % 2 === 0) {
		countScrollUp++;
		if (countScrollUp === 10 || isScrollUp % 4 === 0) {
			const scrollSpeed1 = parseInt(Math.random() * (500 - 100) + 100);
			const dy1 = parseInt(Math.random() * (500 - 10 + 1) + 100);
			try {
				console.log('đã cuộn lên');
				await driver.actions().scroll(0, -`${dy1}`, 0, 200).perform();
			} catch (error) {
				await driver.actions().scroll(0, 0, 0, 200).perform();
			}
			if (countScrollUp === 10) {
				countScrollUp = 0;
			}
			await driver.sleep(sleep);
		}
	}

	if (20 < isScrollUp < 33 && isScrollUp % 4 === 0 && like > 0) {
		console.log('da like auto');

		try {
			const likeButtons = await driver.findElements(
				By.css('svg[aria-label="Like"]')
			);

			console.log('Số lượng phần tử tìm thấy:', likeButtons.length);

			await likeButtons[4].click();

			like = like - 1;
			console.log('số like còn ;', like);
		} catch (error) {
			console.log('Không tìm thấy: ' + error);
		}
	}

	// Tạm nghỉ
	// await driver.sleep(sleep);
};

/**
 * Feature Auto
 *
 * 1. AutoLogin (tự động đăng nhập)
 * 2. AutoLike (tự đông like - ở trang chủ)
 * 3. AutoFollow (tu dong follow)

 */

const AutoLogin = async (req, res) => {
	const params = req.body.param;

	console.log(req.body.param);

	for (let i = 0; i < params.length; i++) {
		AutoSelenium(params[i].username, params[i].password);
	}

	return res.status(200).json({
		status: 'success',
	});
};

const AutoLike = async (req, res) => {
	console.log(req.body);

	like = req.body.numberLike;
	res.status(200).json({
		status: 'success',
	});
};

const numberFollower = async (req, res, next)=>{
	
	const response = await axios.get('https://www.instagram.com/api/v1/friendships/10417890832/followers/', {
		params: {
		  'count': '200',
		  'search_surface': 'follow_list_page'
		},
		headers: {
		  'authority': 'www.instagram.com',
		  'accept': '*/*',
		  'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
		  'cookie': 'ig_did=5324F92E-42E1-4A5D-9E15-636FDA813B9E; ig_nrcb=1; mid=ZMjibwAAAAHOT7z0HDl0wl88Xlqe; datr=HLdDZcXR0c8-pgsuCcj5F6qP; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=45525231037; csrftoken=Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ; dpr=1; shbid="12223\\05445525231037\\0541731772691:01f735d393201b6d8e56c4e60a0dd5607cda3a0198c1a97eda35d040e4aa7a304d4fbbcb"; shbts="1700236691\\05445525231037\\0541731772691:01f75cacb2b6a1b240599bab7c4e4dde337f4ea4acf7aa79192fa9ef7ab58def17670116"; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; fbsr_124024574287414=pEuMNXE1T04zIhzZ2hYfY9n5Ed2Tq0puLl6Py6R4deY.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQ0loaWVoQzM5QmliZ0JIRm5oQTkweUt2alRwUHZFZjZBdDhIbGtweGFaVkVIRnV3NU1XUmFlVmFQMlQyQmQ2MjEyUGo2enRUa0lkWFZUaGxBWm41RzNmREhMbml4WDVHNnhsaGhIekhybHpRelhvZkgxUmViOUJpTldKcVdreXlKZ2I3VUJReXBRc0VYYmtMdzdTWW1wSjZSYTUweXl4MTJqakRjZGlERmdKMGpCZVp4dFRybzN0SVI2eDJ0cFVtcTJucEZRaWpxY2NpaTlZdWdzNTlDSUh4SEZwQkJPNGE1MTRYc0ZnYV81WVMzQnc5RE1Ba2thZHJhSUQ5N0NqSWxIYzFqQ25DRjFaS3NVMVIyVmczVU9HYkdHZXBhX291WDQwT3pGMUV1dXplWngtQ2JUYklfcmNjMk42eTdRQ2l3RmhwN3BtVXY5QmY2MlpRYTQ5MXlZIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT3pPMldyUnZ3WkNtcGF5VVhTTzYwVlBzWDc5Y2s5VGliWkE2Z1pDYmthVDRzU1pDVGdPNTEyOU5WTTJLeFZVTzg4eU9lQkdlUW5mZGNoeFB2c3VGb0RVcUVoa0V1eTJJQWRWSEpDT3NxN2dCTzQ5TmRDcDJ3SDlHaW95VHVXRkpCUWlWUGFkNDM4NHZPWkNaQWJQUW5sZmV0ZnZ2TWtvS2s4MXpaQmExRXM3U1pDa0xrVndHVFhVT3laQVQwWkE0bTRTcGZOWTBCU3dEa1pEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MDAyODA5NDN9; sessionid=45525231037%3ABvOFWLVMALvI1a%3A15%3AAYdFATH00UvUXXGfIwFUK1VrEg9TNrZbJfXhcOy5cWU; rur="EAG\\05445525231037\\0541731816986:01f77cbbc59a825d698f00e0ce76d1158d49b5049522534a8fe3b2b8eaa77038db8f0aa7"',
		  'dpr': '2',
		  'referer': 'https://www.instagram.com/keto.diabeto/followers/',
		  'sec-ch-prefers-color-scheme': 'light',
		  'sec-fetch-dest': 'empty',
		  'sec-fetch-mode': 'cors',
		  'sec-fetch-site': 'same-origin',
		  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
		  'viewport-width': '375',
		  'x-asbd-id': '129477',
		  'x-csrftoken': 'Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ',
		  'x-ig-app-id': '936619743392459',
		  'x-ig-www-claim': 'hmac.AR36c3hDyFa3untbCG7zW4by5_vkW5d6U-MxZx5VHqRqGxnA',
		  'x-requested-with': 'XMLHttpRequest'
		}
	  });
	  res.status(200).json({
		status: 200,
		data: response.data,
	});
}
const detailProfile = async (req, res) => { 
	const response = await axios.get('https://www.instagram.com/api/v1/users/web_profile_info/', {
		params: {
		  'username': 'keto.diabeto'
		},
		headers: {
		  'authority': 'www.instagram.com',
		  'accept': '*/*',
		  'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
		  'cookie': 'ig_did=5324F92E-42E1-4A5D-9E15-636FDA813B9E; ig_nrcb=1; mid=ZMjibwAAAAHOT7z0HDl0wl88Xlqe; datr=HLdDZcXR0c8-pgsuCcj5F6qP; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=45525231037; csrftoken=Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ; dpr=1; shbid="12223\\05445525231037\\0541731772691:01f735d393201b6d8e56c4e60a0dd5607cda3a0198c1a97eda35d040e4aa7a304d4fbbcb"; shbts="1700236691\\05445525231037\\0541731772691:01f75cacb2b6a1b240599bab7c4e4dde337f4ea4acf7aa79192fa9ef7ab58def17670116"; sessionid=45525231037%3ABvOFWLVMALvI1a%3A15%3AAYfJ0DULkE9DcHpy_CgMc8pzXd6uec4_3l64CjQpWYY; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; rur="EAG\\05445525231037\\0541731813522:01f7c8704a71af169e21e3dd7ea0b5b9044d87be7390c1282022ac05f20294cfe013dce8"',
		  'dpr': '1',
		  'referer': 'https://www.instagram.com/dailyart_unity/',
		  'sec-ch-prefers-color-scheme': 'light',
		  'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
		  'sec-ch-ua-full-version-list': '"Google Chrome";v="119.0.6045.125", "Chromium";v="119.0.6045.125", "Not?A_Brand";v="24.0.0.0"',
		  'sec-ch-ua-mobile': '?0',
		  'sec-ch-ua-model': '""',
		  'sec-ch-ua-platform': '"Windows"',
		  'sec-ch-ua-platform-version': '"15.0.0"',
		  'sec-fetch-dest': 'empty',
		  'sec-fetch-mode': 'cors',
		  'sec-fetch-site': 'same-origin',
		  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
		  'viewport-width': '1039',
		  'x-asbd-id': '129477',
		  'x-csrftoken': 'Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ',
		  'x-ig-app-id': '936619743392459',
		  'x-ig-www-claim': 'hmac.AR36c3hDyFa3untbCG7zW4by5_vkW5d6U-MxZx5VHqRqGxnA',
		  'x-requested-with': 'XMLHttpRequest'
		}
	});
	res.status(200).json({
		status: 200,
		data: response.data,
	});
}

const AutoFollow = async (req, res) => {
	console.log(req.body);

	/**
	 * @param {string}
	 * 1 cập nhập danh sách follow istFollower
	 * 2 tung tài khoản duoc vào danh sach di follow sẽ bát dau xet từng tên trong danh sách dẻ tìm kiếm vào follow
	 * 
	 
	 * 
	 * 
	 */

	res.status(200).json({
		status: 'success',
	});
};

module.exports = {
	AutoLogin,
	AutoLike,

};
