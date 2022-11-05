export default function raise (msg: string | Error): never {
  if (typeof msg === 'string') {
    throw new Error(msg)
  } else {
    throw msg
  }
}
