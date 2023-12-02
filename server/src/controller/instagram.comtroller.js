const axios = require('axios');

const searchUser = async (req, res) => {
	const keyword = req.body.key;
	console.log("keyword: " , keyword)

	const jsonData = '{"data":{"context":"blended","include_reel":"true","query":"keto","rank_token":"","search_surface":"web_top_search"},"hasQuery":true}';
	const dataObject = JSON.parse(jsonData);
	dataObject.data.query = keyword;
	const updatedJsonData = JSON.stringify(dataObject);

	const response = await axios.post(
  'https://www.instagram.com/api/graphql',
  new URLSearchParams({
    'av': '17841445571130653',
    '__user': '0',
    '__a': '1',
    '__req': '1s',
    '__hs': '19679.HYP:instagram_web_pkg.2.1..0.1',
    'dpr': '1.5',
    '__ccg': 'UNKNOWN',
    '__rev': '1009978044',
    '__s': ':8isrs2:p31006',
    '__hsi': '7302828582741165159',
    '__dyn': '7xeUjG1mxu1syaxG4VuC0DU98nwgU7SbzEdF8aUco2qwJyEiw9-1DwUx60GE3Qwb-q1ew65xO2OU7m0yE465o-cw5Mx62G3i1ywOwv89k2C1Fwc60AEC7U2czXw8W58jwGzEaE7622362W5olw8Xxm16wUwxwl8vU1aUbpEbUGdG1QwTwFwHg2cwMwrUdUbGwmk1xwmo6O1FwlE6OFA6bxy4VUK',
    '__csr': 'gb4kJM_i8jH4ntlblhqjqqihiAVKLmOnZW-qBlehlGV4QF6VWi9hAVQoCKvqjBQijCQFbWSAAAZaFavzdrWFVVV7KrQBBpByaDUWmK8yXVdkqqbyEgx7QEOAaGbx2GyEFlK00hhYwKeggyk0uO0zUl80Foa2wjo192262a1ng4m08Owwo2Ig11aCo7Gq4o0FQOxZ0yS4qK08FzIsEvwi1p9488oco8l6fh3waUtQEjxG5VE4xwoovg8E422a0pO2m10yaU8Ex4Cto7q1Hwjx0rU5Id5ghyrg6m290yU2kjxd5Do8Vo2Eg1eQ78-6zw-AwhE561xIw3Fjwd66E4C6k2_yZ4w0nHo0Q-1vw6ywio2rw13N068__WG',
    '__comet_req': '7',
    'fb_dtsg': 'NAcP7-02ybQgPpJ1ruHpdKzz0cq06vQEXHJP2YxeKwgnbd0bLKJxzvw:17843691127146670:1698936758',
    'jazoest': '26378',
    'lsd': 'CjqokH6c6_dezkZLaAXa24',
    '__spin_r': '1009978044',
    '__spin_b': 'trunk',
    '__spin_t': '1700322278',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'PolarisSearchBoxRefetchableQuery',
    'variables': updatedJsonData,
    'server_timestamps': 'true',
    'doc_id': '6901177919928333'
  }),
  {
    headers: {
      'authority': 'www.instagram.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
      'cookie': 'ig_did=5324F92E-42E1-4A5D-9E15-636FDA813B9E; ig_nrcb=1; mid=ZMjibwAAAAHOT7z0HDl0wl88Xlqe; datr=HLdDZcXR0c8-pgsuCcj5F6qP; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=45525231037; csrftoken=Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ; shbid="12223\\05445525231037\\0541731772691:01f735d393201b6d8e56c4e60a0dd5607cda3a0198c1a97eda35d040e4aa7a304d4fbbcb"; shbts="1700236691\\05445525231037\\0541731772691:01f75cacb2b6a1b240599bab7c4e4dde337f4ea4acf7aa79192fa9ef7ab58def17670116"; dpr=1; fbsr_124024574287414=JnLcGlpbXxfM2slZEJGQalmFZT7wk_HZo_NE9aR_Lpk.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQ0RMTmZRZHMxSmZfcFRyc3d0Nm5Nd21HT0NQUzZkU3RNZjA3YlE1X245YzkyUUtTY3VGN1AwbHUwU2Z0aXlHTG83dW02TkhiS3JOUmtuUlRNX3paQWNhZlZtT0FUa3FCZFBGOVZ6Y0g1c2xpa3I3SlExUjNBTWVEbGZpbVBUd0NIaDhkX0tGR3NxWFYyeHhjb082eHd5N2JTaVFOTWJhUWxMY1M1eUx2WEJYODJWamZXeWg3aUk3M0REN3h3WEhkbnZ0VVVYSWUyai1nd0VLcWRaU1RtdmxoTGFzRmNBVjdTRXJmRmFrNWZDRE5BYU1ReVREN3hmSVRXWG5mQTc4NmpiYkd1T3Z4ak41U3J5OUZvRzctUDI5S3Z6ZGZmUHBJQnlaZlhMVXdvempqN0FWZnRTc1JQRVI4YWNxREx1VGstUVRCTXNvR096Vi00RVlxYV93U1JNIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzZoN3NYWDdlSGU1THZXdWpqNTJKdVE1ZWtnZWZNMFAyTERTdHlOSkRRdFN1RWQ0RkN5UE9aQ1Q4WkNBWkJLTWw5THh4WkJpd3pDQ2tVS25yREpobmtHOXBxY2hheFBaQzhJcnd1eXU2YkZ3bUdJZnlaQXBuZG4zRjdWWkNidGJNUzVkWkNoWHpqWkI4bEVaQVpCeVB6dXA3OVFBWkNTNVpDVk93NjJRelpBOGFoejlJb2pJNWE3U2JycHVDdWsyOWRxS282T1pDTU5tTFhCSW9ZWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDMwMTU1MH0; fbsr_124024574287414=66wzu2Hn2xd21ZKL2ueJ4CgGb8w3DYv1B0jNKFpBHrw.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQ2FzTVhwbDM4bjZlTUtFY2Jwa2pQOWlyTWt4LXFCMXdSdXV2T01jWGJLZjJHVHM2WDJpVHBuV2g4eXR1SUlEN2ExZ0htYUl3WWR0WlpyY0ZaTEgwd0dhN3RoVVpnRmtxZFlhT2N1TE9DZlB4TDdlRm1TMWttMEdJUWpUeTF2SkdGamRocWRCc2Z4ZVFObjlhYkNpUkl0TS1xakFfNGM4RkFGVHpVc0J1WUpvZ0RKRWppcEdpSTZQWldfckdCM2VJSEVIRk9MdEttaWM5YlpneVFDa2RpekdCYXgtbHc2LVVET1pLcS0wZ0FLc3lHQnI5STlUWFRTMWVJc3BnOEhqeFgtRmpRZ2ZoOUx2dGdRdk45MlJmVm5uV0k3ZlFHRDdWQ2tmMHhheHgydGc1SnVlUFJPdTZCWmxTdDZuMUVOeVZiZktFOHdIemlhTXpENUIxaWdGblNXIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzludVpDdFZpZ3dEVlBxaEFlTmFsTERCcVpDd0FubVlnZmlaQmM4NWo2RVdCWkFUYVVJcWpKQm4xRXI3a3JSRnoxdkJvT2JYNThlYjVHenlYWkEyenNjSTdQN1lFQ1JjV04zU0ZHMUJNVUZCZUd5emp6WHBEN1dnMkhteElaQ0Y3eHRyOUxaQ3k1ZWZNbHFYMFhkYlhXVHluaW96aDdqOGRoeU14eHFHeXhEaFFxMWZSSE9rdUsxbmpqQjNKYnpNS0pNN1pBTmtTeEFaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzAwMzIyNjA1fQ; rur="EAG\\05445525231037\\0541731858618:01f7ff2f95b19c0fc8d049c712bb74824630e6fd2671c29c8bb498ed95422741a456e930"; sessionid=45525231037%3ABvOFWLVMALvI1a%3A15%3AAYcd2Rz_AgR8Sfo9Cy6q28UHJIIZhl6eO03nfVnOE2g',
      'dpr': '1',
      'origin': 'https://www.instagram.com',
      'referer': 'https://www.instagram.com/',
      'sec-ch-prefers-color-scheme': 'light',
      'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      'sec-ch-ua-full-version-list': '"Google Chrome";v="119.0.6045.160", "Chromium";v="119.0.6045.160", "Not?A_Brand";v="24.0.0.0"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-model': '""',
      'sec-ch-ua-platform': '"Windows"',
      'sec-ch-ua-platform-version': '"15.0.0"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'viewport-width': '1126',
      'x-asbd-id': '129477',
      'x-csrftoken': 'Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ',
      'x-fb-friendly-name': 'PolarisSearchBoxRefetchableQuery',
      'x-fb-lsd': 'CjqokH6c6_dezkZLaAXa24',
      'x-ig-app-id': '936619743392459',
      'x-ig-www-claim': 'hmac.AR36c3hDyFa3untbCG7zW4by5_vkW5d6U-MxZx5VHqRqGxnA'
    }
  }
);

	// console.log('response:', response.data);
	res.status(200).json({
		status: 200,
		data: response.data,
	});
};
const numberFollower = async (req, res, next) => {
	const response = await axios.get(
		'https://www.instagram.com/api/v1/friendships/10417890832/followers/',
		{
			params: {
				count: '200',
				search_surface: 'follow_list_page',
			},
			headers: {
				authority: 'www.instagram.com',
				accept: '*/*',
				'accept-language':
					'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
				cookie:
					'ig_did=5324F92E-42E1-4A5D-9E15-636FDA813B9E; ig_nrcb=1; mid=ZMjibwAAAAHOT7z0HDl0wl88Xlqe; datr=HLdDZcXR0c8-pgsuCcj5F6qP; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=45525231037; csrftoken=Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ; dpr=1; shbid="12223\\05445525231037\\0541731772691:01f735d393201b6d8e56c4e60a0dd5607cda3a0198c1a97eda35d040e4aa7a304d4fbbcb"; shbts="1700236691\\05445525231037\\0541731772691:01f75cacb2b6a1b240599bab7c4e4dde337f4ea4acf7aa79192fa9ef7ab58def17670116"; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; fbsr_124024574287414=pEuMNXE1T04zIhzZ2hYfY9n5Ed2Tq0puLl6Py6R4deY.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQ0loaWVoQzM5QmliZ0JIRm5oQTkweUt2alRwUHZFZjZBdDhIbGtweGFaVkVIRnV3NU1XUmFlVmFQMlQyQmQ2MjEyUGo2enRUa0lkWFZUaGxBWm41RzNmREhMbml4WDVHNnhsaGhIekhybHpRelhvZkgxUmViOUJpTldKcVdreXlKZ2I3VUJReXBRc0VYYmtMdzdTWW1wSjZSYTUweXl4MTJqakRjZGlERmdKMGpCZVp4dFRybzN0SVI2eDJ0cFVtcTJucEZRaWpxY2NpaTlZdWdzNTlDSUh4SEZwQkJPNGE1MTRYc0ZnYV81WVMzQnc5RE1Ba2thZHJhSUQ5N0NqSWxIYzFqQ25DRjFaS3NVMVIyVmczVU9HYkdHZXBhX291WDQwT3pGMUV1dXplWngtQ2JUYklfcmNjMk42eTdRQ2l3RmhwN3BtVXY5QmY2MlpRYTQ5MXlZIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT3pPMldyUnZ3WkNtcGF5VVhTTzYwVlBzWDc5Y2s5VGliWkE2Z1pDYmthVDRzU1pDVGdPNTEyOU5WTTJLeFZVTzg4eU9lQkdlUW5mZGNoeFB2c3VGb0RVcUVoa0V1eTJJQWRWSEpDT3NxN2dCTzQ5TmRDcDJ3SDlHaW95VHVXRkpCUWlWUGFkNDM4NHZPWkNaQWJQUW5sZmV0ZnZ2TWtvS2s4MXpaQmExRXM3U1pDa0xrVndHVFhVT3laQVQwWkE0bTRTcGZOWTBCU3dEa1pEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MDAyODA5NDN9; sessionid=45525231037%3ABvOFWLVMALvI1a%3A15%3AAYdFATH00UvUXXGfIwFUK1VrEg9TNrZbJfXhcOy5cWU; rur="EAG\\05445525231037\\0541731816986:01f77cbbc59a825d698f00e0ce76d1158d49b5049522534a8fe3b2b8eaa77038db8f0aa7"',
				dpr: '2',
				referer: 'https://www.instagram.com/keto.diabeto/followers/',
				'sec-ch-prefers-color-scheme': 'light',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
				'viewport-width': '375',
				'x-asbd-id': '129477',
				'x-csrftoken': 'Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ',
				'x-ig-app-id': '936619743392459',
				'x-ig-www-claim':
					'hmac.AR36c3hDyFa3untbCG7zW4by5_vkW5d6U-MxZx5VHqRqGxnA',
				'x-requested-with': 'XMLHttpRequest',
			},
		}
	);
	res.status(200).json({
		status: 200,
		data: response.data,
	});
};
const detailProfile = async (req, res) => {
	const name = req.query.username

	console.log("name", name);
	const response = await axios.get(
		'https://www.instagram.com/api/v1/users/web_profile_info/',
		{
			params: {
				username: name,
			},
			headers: {
				authority: 'www.instagram.com',
				accept: '*/*',
				'accept-language':
					'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
				cookie:
					'ig_did=5324F92E-42E1-4A5D-9E15-636FDA813B9E; ig_nrcb=1; mid=ZMjibwAAAAHOT7z0HDl0wl88Xlqe; datr=HLdDZcXR0c8-pgsuCcj5F6qP; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=45525231037; csrftoken=Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ; dpr=1; shbid="12223\\05445525231037\\0541731772691:01f735d393201b6d8e56c4e60a0dd5607cda3a0198c1a97eda35d040e4aa7a304d4fbbcb"; shbts="1700236691\\05445525231037\\0541731772691:01f75cacb2b6a1b240599bab7c4e4dde337f4ea4acf7aa79192fa9ef7ab58def17670116"; sessionid=45525231037%3ABvOFWLVMALvI1a%3A15%3AAYfJ0DULkE9DcHpy_CgMc8pzXd6uec4_3l64CjQpWYY; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; fbsr_124024574287414=kXrIj636c62kAwJyh17_XvXwGk54G8eaiNtsi4MmPCc.eyJ1c2VyX2lkIjoiMTAwMDA2MzQwNDgyMjI5IiwiY29kZSI6IkFRQzZlaHdQbGxOTDNnZm5Da3hBcEI2ODlZRFJvQzdRMjhkLXphU0tDTjk0cTRKdFpBX0c2QTZKZE90N1JRRjRMYmFHVklZb1FMeUgyZElSOWdmZ1BDTU15VmI2VGZWUXJCNHZHaEtWMHpOUjJSTllva1M3bHFUYXBTOEZKenRHbnpHRGtCaU43c3FJUV9nbFBnbGRpSzdUYjl0SElRME9meU02R3d3SDk1X3pNSVZxWUxpU0FWbXh5RlB6U2RBbWxpVHMzTlU3cFh4RnlhbVh5SkhvMkl4REU5VWFveDdQMlFrOXdSZl9CMzBkZXkxOGI3VWhnYUtjY1pJcWI0LWs1R215V3R1dEN0cW5UWTRsWU8xdGU0UmNlSHhLTHNSZVJfVUZNdGtqMGJhMVVRMnFJZHo3Q0h1N3FxU0J4Mk4tMlk0RW11cDgweTdzdkhMc05teUt4YkxDIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzRoZnhKd1BVUG1INGdNRDA2cDJZYnJoODZqWDRQaktaQWxHV0g5T3dvN2hmMFJ1RFpCbTQyejJwYTFmRzJ1dFNFSDdVM252V0ZRZFNRMmd2akF5cllsWkFwbnFQZVN0UkJoakx6NGZQVG50WVhsVVh0WTQzT1pCU1pBTE5NaUs1Q0hJaFluWkNTekR6ZmQ1dUI5Mnp6TVZ6UEJPU252dEo2RDR4WkFZZ3V6TFQ3ajNkMnQ0ZUNmWVpBakVJZkthWkNibThFM3BsRG84WkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTcwMDI3NzQ5OX0; rur="EAG\\05445525231037\\0541731813522:01f7c8704a71af169e21e3dd7ea0b5b9044d87be7390c1282022ac05f20294cfe013dce8"',
				dpr: '1',
				referer: 'https://www.instagram.com/dailyart_unity/',
				'sec-ch-prefers-color-scheme': 'light',
				'sec-ch-ua':
					'"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
				'sec-ch-ua-full-version-list':
					'"Google Chrome";v="119.0.6045.125", "Chromium";v="119.0.6045.125", "Not?A_Brand";v="24.0.0.0"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-model': '""',
				'sec-ch-ua-platform': '"Windows"',
				'sec-ch-ua-platform-version': '"15.0.0"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
				'viewport-width': '1039',
				'x-asbd-id': '129477',
				'x-csrftoken': 'Q7KhVptDoxDklpuLoUzpjmXVsgILrVvZ',
				'x-ig-app-id': '936619743392459',
				'x-ig-www-claim':
					'hmac.AR36c3hDyFa3untbCG7zW4by5_vkW5d6U-MxZx5VHqRqGxnA',
				'x-requested-with': 'XMLHttpRequest',
			},
		}
	);
	res.status(200).json({
		status: 200,
		data: response.data,
	});
};
module.exports = {
	searchUser,
	detailProfile
};
