import { AnonAadhaarPCD } from 'anon-aadhaar-pcd'
import pako from 'pako'

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
		return error
	}
}
