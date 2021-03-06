import { request } from 'graphql-request'
import useSWR from 'swr'
import QueryEditor from './query-editor';
import QueryHighlighter from './query-highlighter'
import Loading from './loading'
import theme from 'prism-react-renderer/themes/github'

const styles = {
 results: {
  whiteSpace: 'pre-wrap',
  flex: 1,
  margin: '4px',
  padding: '10px',
  fontFamily: '"Dank Mono", "Fira Code", monospace',
 } 
}

const fetcher = query =>
  request('https://api.baseql.com/airtable/graphql/appuzDcQEvfnkzXjD', query)

export default function QueryPlayground({query, disabled = false}) {
  const { data, error } = useSWR(query, fetcher)

  return (
    <div style={{width: '100%', maxHeight: '300px', display: 'flex', alignItems: 'stretch'}}>
      <QueryEditor query={query} disabled={disabled}/>
      <pre style={styles.results}>
        {!data && !error && <Loading />}
        {!!data && (
          <QueryHighlighter code={JSON.stringify(data, undefined, 2)} theme={theme} />
        )}
        {!!error && (
          <div>❌ Error: 
            <QueryHighlighter code={JSON.stringify(error, undefined, 2)} theme={theme} />
          </div>
        )}
      </pre>
    </div>
  )
}