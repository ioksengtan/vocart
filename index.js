$(document).ready(function() {
	$('#vocart_main').hide()	
		$('#all_articles_main').hide()
	data_index = {
		'article_dates':{
			2020:{
				12: [27, 30]
			},
			2021:{
				1: [15,22]				
			}
			
		}
	}
		
	data_articles = {
		'articles' : [
			{
				'title':'Internet 3.0 and the Beginning of (Tech) History',
				'link': 'https://stratechery.com/2021/internet-3-0-and-the-beginning-of-tech-history/',
				'year': '2021',
				'month': '1',
				'date':'17',
			},
			{
				'title': 'techmeme 2021-01-18',
				'year': '2021',
				'month': '1',
				'date':'21',
			},
			{
				'title': 'techmeme 2021-01-19',
				'year': '2021',
				'month': '1',
				'date':'20',
			},
		]
	}
	data = {
		'title':{
			'content':'Internet 3.0 and the Beginning of (Tech) History',
			'link':'https://stratechery.com/2021/internet-3-0-and-the-beginning-of-tech-history/'
		},
		'date': {
			'year': '2021',
			'month': 'January',
			'day': '15'
		},
		'tags':[
			'Stratechery','test'
		],
		'vocarts':[
			{
				'quote': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
				'vocs': [
					{
						'voc': 'prescience',
						'definition': 'the ability to know or correctly suggest what will happen in the future.'
					},
					{
						'voc':'test',
						'definition':'test'
					}
				]
			},
			{ 
				'quote': "Now that history has returned with the vengeance of the long-dismissed, few analyses of our present moment are complete without a ritual mockery of Fukuyama’s seemingly naive assumptions.",
				'vocs':[
					{
						'voc':"vengeance",
						'definition': "Punishment inflicted or retribution exacted for an injury or wrong."
					},
					{
						'voc':"contemp",
						'definition': "The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.",
						'examples':[
							"At school she had complete contempt for all her teachers.",
							"You should treat those remarks with the contempt that they deserve.",
							"She's beneath contempt (= I have no respect for her)!"
						]
					},
				]
			},
			
		]
	};
	var componentVocartTitle = Object.create(ComponentVocartTitle);
	var componentVocartTags = Object.create(ComponentVocartTags);
	var componentArticles = Object.create(ComponentArticles);
	componentVocartTitle.create('Internet 3.0 and the Beginning of (Tech) History','https://stratechery.com/2021/internet-3-0-and-the-beginning-of-tech-history/');
	componentVocartTags.create(data.tags);
	componentArticles.create(data_articles.articles);
	renderComponent('#vocart_title', componentVocartTitle);	
	renderComponent('#vocart_tags', componentVocartTags);
	renderComponent('#all_articles_main', componentArticles);
	render_vocarts('#vocarts', data.vocarts)
});
function renderComponent(div, component){
		//console.log(component);
		$(div).append(component.dom);
}

function render_vocart_title(div, title, link){
	//reg_str = "<a href='" + link + ''' target="_blank">' + title + "</a>";
	var reg_str = "<a href='" + link + "' target='_blank'>"+ title+ "</a>";
	$(div).append(reg_str);
}

/*
ComponentVocartTitle{
	title: String
	link: String
}

*/
var ComponentVocartTitle = {
  dom : '',
  create: function(title_in, link_in) {  // Method which will display type of Animal
	
	 // Create anchor element. 
	var ele = document.createElement('a');  
	// Create the text node for anchor element. 
	var title = document.createTextNode(title_in); 	  
	// Append the text node to anchor element. 
	ele.appendChild(title); 
	// Set the href property. 
	ele.href = link_in;  
	// Append the anchor element to the body. 
	//document.body.appendChild(a); 
	this.dom = ele;	
  }
};
var ComponentArticles = {
	dom:'',
	create:function(articles){
		var ele = document.createElement('div');
		for(article_id in articles){
			$(ele).append("<p>"+ articles[article_id]['title'] +"</p>")
		}
		//console.log(this.dom);
		this.dom = ele;
	}
}
	//ComponentArticles {
	//	title: String
	//	link: String
	//	year: String
	//  month: String
	//  date: String
	//}

var ComponentVocartTags = {
	dom: '',
	create: function(tags){
		var ele = document.createElement('div'); 
		//var ele = document.createElement('span');  
		//ele.class="badge bg-primary";
		for(tag_id in tags){
			$(ele).append("<span class='badge bg-primary'>"+tags[tag_id]+"</span> ")
		}
		
		//ele.innerHTML = tags[0];
		
		this.dom = ele;
	}
}

// Create new animal type called animal1
function render_vocart_tags(div, tags){
	var reg_str = '';
	for(tag_id in tags){
		reg_str += '<span class="badge bg-primary" >'+tags[tag_id]+'</span> ';
	}
	$(div).append(reg_str)
}
/*
				'quote': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
				'vocs': [
					{
						'voc': 'prescience',
						'definition': 'the ability to know or correctly suggest what will happen in the future.'
					}
				]
				*/
function render_vocarts(div, vocarts){
		for(vocart_id in vocarts){
			render_vocart(div, vocarts[vocart_id]);
		}
}
var ComponentVocart = {
	dom: '',
	create: function(vocart){
		var ele = document.createElement('div'); 

		this.dom = ele;
	}
}
function render_vocart(div, vocart){
	tmp = vocart;
	var reg_str = '';
	reg_str="<blockquote class='blockquote bg-light '>\
          <p class='mb-0'>\
        " +  vocart.quote +"</p>\
        </blockquote>";
		for(voc_id in vocart.vocs){
			reg_str+= "<div class='card mb-3 border-white ' style='max-width: 100%;'>\
          <div class='card-header bg-white'><i class='bi bi-bookmark-star'></i>" + vocart.vocs[voc_id].voc +" </div>\
          <div class='card-body'>\
            <p class='card-text'>"+ vocart.vocs[voc_id].definition +"</p>";
			
			for(example_id in vocart.vocs[voc_id].examples){
				reg_str+="ex:  " + vocart.vocs[voc_id].examples[example_id]+"<br/>";
			}
			reg_str+="\
          </div>\
        </div>";
		}
		
		$(div).append(reg_str);
}


function show_all_articles(){
	//console.log('show all articles');
		$('#main').hide();
		$('#vocart_main').hide();	
		$('#all_articles_main').show()
}

function show_vocart_main(date){
	//console.log(date);
	$('#all_articles_main').hide()
		$('#main').hide();
		$('#vocart_main').show();
}