import { createHelia } from 'helia'
import { strings } from '@helia/strings'

async function main() {
    const helia = await createHelia()
    const s = strings(helia)

    const myImmutableAddress = await s.add('hello worlddddd~~~!@!!!!')

    console.log(myImmutableAddress, await s.get(myImmutableAddress))
    // hello world
}

main();