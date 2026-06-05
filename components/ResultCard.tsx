interface Props {
  result: string
}

export default function ResultCard({ result }: Props) {
     return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-lg">
        <p>{result}</p>
      </div>
     )
}