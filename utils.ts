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

export const decompressProof = (base64Compressed: string) => {
	// Convert the base64 string back to a Uint8Array
	const compressed = Uint8Array.from(Buffer.from(base64Compressed, 'base64'))

	// Decompress the data
	const decompressed = pako.ungzip(compressed, { to: 'string' })

	// Convert the string back to JSON
	const proof = JSON.parse(decompressed)

	return proof
}
