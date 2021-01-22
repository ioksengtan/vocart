index.html:
	list_articles_title = exec_sql('select title from articles')
	render_index_articles(list_articles_title)

	?article_id:
		list_vocs = exec_sql('select * from vocs where article_id = article_id')
		list_voc_examples = exec_sql('select * from voc_examples where article_id = article_id')
		list_notes = exec_sql('select * from notes where article_id = article_id')
		render_index_articles( articles[article_id].title )
		list_quotes = exec_sql('select * from quotes where article_id = article_id')
		for quote in list_quotes:
			render_article_quotes(quote.content)
			for voc in list_vocs:
				if voc.quote_id == quote.quote_id:
					render(voc)
				for example in list_voc_examples:
					if example.voc_id == voc.voc_id:
					render(example)
			for note in list_notes:
				if note.quote_id == quote.quote_id:
					render(note)
for quote in list_quotes:
	
	html_vocart_cards(str title, str content)
	html_vocart_quote(str content, str[] vocs)
	html_vocart_article_title(str title)



https://stratechery.com/2015/aggregation-theory/


quote.json
	{
		content: 'Airbnb and the Internet Revolution described how Airbnb a...'
		voc: [
			
		]
	}

quote
	Airbnb and the Internet Revolution described how Airbnb and the sharing economy have commoditized trust, enabling a new business model based on aggregating resources and managing the customer relationship
	voc
		commoditized
		examples:
			the commodification of leisure in modern life

type Query {
	quotes: [Quote]
}

type Article {
	id: ID!
	title: String
	link: String	
	quotes: [Quote]
}

type Quote {
	id: ID!
	content: String
	vocs: [Voc]
	voc_examples: [VocExample]
	notes: [Note]
	article: Article
}

type Voc {
	id: ID!
	name: String
	description: String
	quote: Quote
	article: Article
	transform: VocOther
}

type VocOther {
	id: ID!
	voc: Voc
}

type Note {
	id: ID!
	title: String
	content: String
	quote: Quote
	article: Article	
}