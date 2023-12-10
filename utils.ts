import { AnonAadhaarPCD, BigNumberish, exportCallDataGroth16FromPCD } from 'anon-aadhaar-pcd'
import pako from 'pako'
import { createPublicClient, getContract, http } from 'viem'
import { celoAlfajores } from 'viem/chains'

export const compressProof = (proof: AnonAadhaarPCD) => {
	// Convert JSON data to string
	const jsonString = JSON.stringify(proof)

	// Compress the string using GZIP
	const compressed = pako.gzip(jsonString)

	// Convert the compressed data to a base64 string
	const base64Compressed = Buffer.from(compressed).toString('base64')

	// Check the length of the base64 string
	console.log('Length of base64 string: ', base64Compressed.length)

	// If the length is reasonable, proceed to generate the QR code
	if (base64Compressed.length < 2953) {
		return base64Compressed
	} else {
		console.error('Data is too large to fit in a single QR code.')
	}
}

export const exampleString =
	'H4sIAAAAAAAAA+2WXW4bSQyE7zLPFkA2f5rtqxhBMJasxIBjCdp4gUXgu+9HG8gV8hLID6Nxd7FYVST0a/v53/Vpu9/218vrYd9P3/f9drgeT9vd9nzivZ/WFD/G4Tz2/eDm58Oe9nR4mnraz49SQ5Ozx5f9+cd2/2v7cTm9vbz9w80hIbkkZo7wIXwdXlM1NWetlBUjc40xJSpjLR4maDWmikmYB4+pS1JleM5cy/h48afqamtajIBeRg4qKJd1qQ4qOKepqmNIeoxFwWmpY3Ey0iuoUFDTKksYBAyGTDMZNVLcKC0L0qZ8Zs3JI5grQsXpgvtrQSyivIaBvbJmWgDg0zPdio7FCuaSQM4FPVlziXv5Sm0tXJ1rSyYX0ukiympUUZd/iA+6TY2aIhXI1UVbImR1KFbViFyZprOaOIj0g2h0CCuQFIsWnCqWaYlkDSxbXNcwg29xf7qHUmYJwivNQBFxC+0VzoaKCzXQqy0zyMzwpBKtD2sx6d+Uy4JToaAa1jTiUiTwtWYYGnOAKIzKatXHcKEbbx/SnKt4kIWxEAtOOJlAMUQWFTGOtFNTAOVVGEKrbe932/V2uZz/5u9v/v5E/u6217eXl+fz89ON3EXAXNSpTlLcZPos15hcQIOmPA2x2xFKDlomIJJSxBAHnTYSliUzgN6v168fm3iRB4T7YMx5JT5IgLIQVjJQUMNL7ZTqnL2Vf0/F9fnrvt0/bJhErKPDBXNNxPZOna1cOmlHqtNGWtEWdFtwytYeQ+iFQFMWE1EefKLuHcQeD0I5Som3tiOEC1gNqmGEpTEyNkZQg0LkBy3bNKwQctC6Nt725a65PsL1gQFWxklWWcvFqIUzbBPP6BBULo8OaiixZDpABCsTObswXyDEf4nZGI1OBiZKrVlJXNZKMNOdFERHFjdoCK8NmVGYFwbrGX3Ueg8w0SgS7BWH6cOmNEkUvWOPdOwC2uYwPoLUz4QLCNcpvRwiSAEve4KoWs6kAk8OSQAMsZPL02mvV0RQq8ejM0vLuBKUoiBj286Rn0VKQV0sGILEaomPgbYcnwQBle3Lp6rHTgCKMgSjjJtsMQgya4ay9ELFWAQTsQ3RCSB+GzUY2omoTDLaE0vWyQeJpsycsiboqO0sGi0WVyE9oafvgHnAlIYmvx6M8DEDjDCLoRXpdYlBAv/8nYDb5efleHkh9N94/P75C+Pt9m//UHl8BXt7f3//H+iC9ZK7CAAA'

export const exampleProof = {
	type: 'anon-aadhaar-pcd',
	id: '3bb13cad-fb9c-49b6-bc63-27e3412a64ba',
	claim: {
		modulus:
			'20506905762542020524871161678960952669227058659927078218271030534582761906102467699393948948114139735259706562420121819112616469954212206452989673612962456485305857618836705565920733028260432760902031313787720369995510471130599102558482336196876350284746643805203867606604791810979044849617116414687907664642425838288031468042894615870085669599118270574276888256966317882601643671908532332881082928485931800682216974215333508696744511589005313614483528061110932069902761669230087546367823235305619310530467515083259158991386499753659530202286867052240182476186344672076897333556704707979558010033445565709135805374613',
	},
	proof: {
		modulus:
			'20506905762542020524871161678960952669227058659927078218271030534582761906102467699393948948114139735259706562420121819112616469954212206452989673612962456485305857618836705565920733028260432760902031313787720369995510471130599102558482336196876350284746643805203867606604791810979044849617116414687907664642425838288031468042894615870085669599118270574276888256966317882601643671908532332881082928485931800682216974215333508696744511589005313614483528061110932069902761669230087546367823235305619310530467515083259158991386499753659530202286867052240182476186344672076897333556704707979558010033445565709135805374613',
		nullifier:
			'5535201491594843074784157805593782373464047944620055290608865763410560208075',
		app_id: '909016940182290185746328468914828556687193931776',
		proof: {
			pi_a: [
				'4092795458004537903293634576526550520901901697576280147758273783458491894258',
				'16412060390657651832850316079790834253212969328800804064328155360498030237090',
				'1',
			],
			pi_b: [
				[
					'13520013760341831827049391188574444983351228146325011516503050051987486898726',
					'7000951491670355112505556303154815445286638113305697656870309978163035480333',
				],
				[
					'3548989282328315492839964934470653249129917732577022337673162384433355038143',
					'12415886942199114770939579549798421723919871336099648414106126308134360801424',
				],
				['1', '0'],
			],
			pi_c: [
				'11383492376691096006858387065219751510870256431882576074104545422355342797125',
				'10164300152630042301470803872071306093380600944019422016128006001839496392790',
				'1',
			],
			protocol: 'groth16',
			curve: 'bn128',
		},
	},
}

export const decompressProof = (base64Compressed: string) => {
	try {
		// Step 1: Decode the base64 string to binary data
		const binaryData = Buffer.from(base64Compressed, 'base64')

		// Step 2: Decompress the binary data using GZIP
		const decompressed = pako.inflate(binaryData, { to: 'string' })

		// Convert the string back to JSON
		const proof = JSON.parse(decompressed)

		return proof
	} catch (error) {
		return (error as Error).message
	}
}

const CONTRACT_ABI = [
	{
		type: 'constructor',
		stateMutability: 'nonpayable',
		inputs: [
			{ type: 'address', name: '_verifierAddr', internalType: 'address' },
			{ type: 'uint256', name: '_appId', internalType: 'uint256' },
		],
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'ISSUER_MODULUS',
		inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'SNARK_SCALAR_FIELD',
		inputs: [],
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'appId',
		inputs: [],
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'verifierAddr',
		inputs: [],
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'verifyProof',
		inputs: [
			{ type: 'uint256[2]', name: 'a', internalType: 'uint256[2]' },
			{ type: 'uint256[2][2]', name: 'b', internalType: 'uint256[2][2]' },
			{ type: 'uint256[2]', name: 'c', internalType: 'uint256[2]' },
			{ type: 'uint256[34]', name: 'input', internalType: 'uint256[34]' },
		],
	},
]

const CONTRACT_ADDRESS = '0x8910502d1B0935802798829097E4F36Fe251eA06'

export const verifyProof = async (proof: AnonAadhaarPCD) => {
	const client = createPublicClient({
		chain: celoAlfajores,
		transport: http(),
	})

	const { a, b, c, Input } = await exportCallDataGroth16FromPCD(proof)

	const res = await client.readContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: 'verifyProof',
		args: [a, b, c, Input],
	})

	return res as boolean;
}
