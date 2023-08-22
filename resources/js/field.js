import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-formatted-number', IndexField)
  app.component('detail-formatted-number', DetailField)
  app.component('form-formatted-number', FormField)
})
