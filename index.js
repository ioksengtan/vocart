var appUrl = 'https://script.google.com/macros/s/AKfycbzR4fhfQmSrbFrf336DHrKKodAUsRTN-Yf7_tyXStyH1Q8glYc/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1xRnAGXr3d7rL9PDIYtG9L6F827TEthKmCoje_veaKNo/edit#gid=0'; //$('#sheetsUrl'),
var sheetName = 'articles';
var load_status = {
    'articles': false,
}
parameter = {
    url: sheetsUrl,
    name: sheetName,
    command: 'getAllArticles'
};
$(document).ready(function() {
    $('#vocart_main').hide()
    $('#all_articles_main').hide()
    $('#practice_main').hide();

    DataVocartCalendar = {

        2021: {
            1: {
                15: 'vocart',
                16: 'na_tree-fill',
                17: 'na_bicycle',
                18: 'na_tree-fill',
                19: 'na_tree-fill',
                20: 'na_tree-fill',
                21: 'na_tree-fill',
                22: 'vocart',
            }
        },
        2020: {
            12: {
                27: 'vocart',
                30: 'vocart',
            }
        },


    }
    Months = {
        1: 'January',
        2: 'Feburary',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'

    }
    /*
	Title {
		content: String
		link: String
	}
	Quiz {
		question: String
		answer: String
		definition: String
		quote: Quote
		examples: [Example]
	}
	ComponentPractice {
		title: Title
		date: Date
		tags: [String]
		quizzes: [Quiz]
		
	}*/
    DataPractice = {
        'title': {
            'content': 'Internet 3.0 and the Beginning of (Tech) History',
            'link': 'https://stratechery.com/2021/internet-3-0-and-the-beginning-of-tech-history/'
        },
        'date': {
            'year': '2021',
            'month': 'January',
            'day': '15'
        },
        'tags': [
            'Stratechery', 'test'
        ],
        'quizzes': [{
                'question': 'c_ _ _ _ _ _ (7 char)',
                'answer': 'contemt',
                'definition': 'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.',
                'quote': {
                    'content': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
                    'tags': ['Stratechery']
                },
                'examples': [
                    "At school she had complete c______ for all her teachers.",
                    "You should treat those remarks with the c______ that they deserve.",
                    "She's beneath c______ (= I have no respect for her)!"
                ]
            },
            {
                'question': 'c_ _ _ _ _ _ (7 char)',
                'answer': 'contemt',
                'definition': 'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.',
                'quote': {
                    'content': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
                    'tags': ['Stratechery']
                },
                'examples': [
                    "At school she had complete c______ for all her teachers.",
                    "You should treat those remarks with the c______ that they deserve.",
                    "She's beneath c______ (= I have no respect for her)!"
                ]
            },
        ]
    }

    DataVocarts = {
        'title': {
            'content': 'Internet 3.0 and the Beginning of (Tech) History',
            'link': 'https://stratechery.com/2021/internet-3-0-and-the-beginning-of-tech-history/'
        },
        'date': {
            'year': '2021',
            'month': 'January',
            'day': '15'
        },
        'tags': [
            'Stratechery', 'test'
        ],
        'vocarts': [{
                'quote': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
                'vocs': [{
                        'voc': 'prescience',
                        'definition': 'the ability to know or correctly suggest what will happen in the future.'
                    },
                    {
                        'voc': 'test',
                        'definition': 'test'
                    }
                ]
            },
            {
                'quote': "Now that history has returned with the vengeance of the long-dismissed, few analyses of our present moment are complete without a ritual mockery of Fukuyama’s seemingly naive assumptions.",
                'vocs': [{
                        'voc': "vengeance",
                        'definition': "Punishment inflicted or retribution exacted for an injury or wrong."
                    },
                    {
                        'voc': "contemp",
                        'definition': "The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.",
                        'examples': [
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

    var componentPractice = Object.create(ComponentPractice);
    var componentVocarts = Object.create(ComponentVocarts);
    var componentVocartCalendar = Object.create(ComponentVocartCalendar);
    componentVocarts.create(DataVocarts);

    componentPractice.create(DataPractice);
    componentVocartCalendar.create(DataVocartCalendar);
    renderComponent('#calendar_main', componentVocartCalendar);
    renderComponent('#vocart_title', componentVocartTitle);
    renderComponent('#vocart_tags', componentVocartTags);

    renderComponent('#practice_main', componentPractice);
    renderComponent('#vocarts', componentVocarts);


});

function renderComponent(div, component) {
    //console.log(component);
    $(div).append(component.dom);
}

function render_vocart_title(div, title, link) {
    //reg_str = "<a href='" + link + ''' target="_blank">' + title + "</a>";
    var reg_str = "<a href='" + link + "' target='_blank'>" + title + "</a>";
    $(div).append(reg_str);
}

/*
ComponentVocartTitle{
	title: String
	link: String
}

*/
/*
	title: Title
		date: Date
		tags: [String]
		quizzes: [Quiz]
		
	
*/

var ComponentVocartCalendar = {
    dom: '',
    create: function(DataVocartCalendar) {
        var ele = document.createElement('div');
        years = ['2021', '2020'];
        for (var year_id in years) {
            year = years[year_id];
            $(ele).append('<h3>' + year + '</h3>');
            for (var month in DataVocartCalendar[year]) {
                $(ele).append('<h4>' + Months[month] + '</h4>');
                for (var date in DataVocartCalendar[year][month]) {
                    if (DataVocartCalendar[year][month][date].includes("na")) {
                        $(ele).append('<i class="bi bi-' + DataVocartCalendar[year][month][date].split('na_')[1] + '"></i>');
                    } else {
                        $(ele).append('<a href="javascript:show_vocart_main(' + year + ',' + month + ',' + date + ')">' + date + '</a> ');
                    }
                }
            }
        }
        //console.log(ele);
        this.dom = ele;
    }
}

var ComponentPractice = {
    dom: '',
    create: function(DataPractice) {
        var ele = document.createElement('div');
        $(ele).append('\
			<div>' + DataPractice.title.content + '</div>\
		');

        for (var i in DataPractice.quizzes) {
            DataQuiz = DataPractice.quizzes[i];
            //console.log(DataQuiz);
            $(ele).append('<p>' + DataQuiz.question + '</p>');
            $(ele).append('<p>' + DataQuiz.definition + '</p>');
            $(ele).append('<p>' + DataQuiz.quote.content + '</p>');
            $(ele).append('<p>examples:<p>');
            for (var j in DataQuiz.examples) {
                DataExample = DataQuiz.examples[j];
                $(ele).append('<p>' + DataExample + '</p>');
            }

            $(ele).append('<p> ------ </p>');
        }
        this.dom = ele;
        //console.log(this.dom);
    }
};
/*
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
		'quizzes':[
			{
				'question':'c_ _ _ _ _ _ (7 char)',
				'answer':'contemt',
				'definition':'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.',
				'quote': {
					'content': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
					'tags':['Stratechery']
				},
				'examples': [
					"At school she had complete c______ for all her teachers.",
					"You should treat those remarks with the c______ that they deserve.",
					"She's beneath c______ (= I have no respect for her)!"
				]
			},
			{
				'question':'c_ _ _ _ _ _ (7 char)',
				'answer':'contemt',
				'definition':'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.',
				'quote': {
					'content': "Francis Fukuyama’s The End of History and the Last Man is, particularly relative to its prescience, one of the most misunderstood books of all time. Aris Roussinos explained at UnHerd",
					'tags':['Stratechery']
				},
				'examples': [
					"At school she had complete c______ for all her teachers.",
					"You should treat those remarks with the c______ that they deserve.",
					"She's beneath c______ (= I have no respect for her)!"
				]
			},
		]
		*/
var ComponentVocarts = {
    dom: '',
    create: function(DataVocarts) {
        //console.log(DataVocarts);
        var ele = document.createElement('div');
        $(ele).append('Source: <h2>' + DataVocarts.title.content + '<h2>');
        for (var i in DataVocarts.vocarts) {
            var componentVocart_reg = Object.create(ComponentVocart);
            componentVocart_reg.create(DataVocarts.vocarts[i]);
            $(ele).append(componentVocart_reg.dom);
        }
        this.dom = ele;
    }

}

/*
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
*/
var ComponentVocart = {
    dom: '',
    create: function(DataVocart) {
        //console.log(DataVocart.quote);
        var ele = document.createElement('div');
        reg_str = "<blockquote class='blockquote bg-light '>\
          <p class='mb-0'>\
        " + DataVocart.quote + "</p>\
        </blockquote>";
        for (voc_id in DataVocart.vocs) {
            reg_str += "<div class='card mb-3 border-white ' style='max-width: 100%;'>\
          <div class='card-header bg-white'><i class='bi bi-bookmark-star'></i>" + DataVocart.vocs[voc_id].voc + " </div>\
          <div class='card-body'>\
            <p class='card-text'>" + DataVocart.vocs[voc_id].definition + "</p>";

            for (example_id in DataVocart.vocs[voc_id].examples) {
                reg_str += "ex:  " + DataVocart.vocs[voc_id].examples[example_id] + "<br/>";
            }
            reg_str += "\
          </div>\
        </div>";
        }
        $(ele).append(reg_str);
        //$(ele).append(DataVocart.vocs[0].voc);
        this.dom = ele;
    }

}


var ComponentVocartTitle = {
    dom: '',
    create: function(title_in, link_in) { // Method which will display type of Animal

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
    dom: '',
    create: function(articles) {
        var ele = document.createElement('div');
        for (article_id in articles) {
            $(ele).append("<p>" + articles[article_id]['title'] + "</p>")
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
    create: function(tags) {
        var ele = document.createElement('div');
        //var ele = document.createElement('span');  
        //ele.class="badge bg-primary";
        for (tag_id in tags) {
            $(ele).append("<span class='badge bg-primary'>" + tags[tag_id] + "</span> ")
        }

        //ele.innerHTML = tags[0];

        this.dom = ele;
    }
}

// Create new animal type called animal1
function render_vocart_tags(div, tags) {
    var reg_str = '';
    for (tag_id in tags) {
        reg_str += '<span class="badge bg-primary" >' + tags[tag_id] + '</span> ';
    }
    $(div).append(reg_str)
}


function render_vocart(div, vocart) {
    tmp = vocart;
    var reg_str = '';
    reg_str = "<blockquote class='blockquote bg-light '>\
          <p class='mb-0'>\
        " + vocart.quote + "</p>\
        </blockquote>";
    for (voc_id in vocart.vocs) {
        reg_str += "<div class='card mb-3 border-white ' style='max-width: 100%;'>\
          <div class='card-header bg-white'><i class='bi bi-bookmark-star'></i>" + vocart.vocs[voc_id].voc + " </div>\
          <div class='card-body'>\
            <p class='card-text'>" + vocart.vocs[voc_id].definition + "</p>";

        for (example_id in vocart.vocs[voc_id].examples) {
            reg_str += "ex:  " + vocart.vocs[voc_id].examples[example_id] + "<br/>";
        }
        reg_str += "\
          </div>\
        </div>";
    }

    $(div).append(reg_str);
}


function show_all_articles() {
    //console.log('show all articles');
    $('#main').hide();
    $('#vocart_main').hide();
    $('#all_articles_main').show()
    $('#practice_main').hide();
    if (load_status.articles == false) {
        load_status.articles = true
        $.get(appUrl, parameter, function(data) {

            var input_buffer = JSON.parse(data);
            //console.log(input_buffer);
            input_buffer.table
            DataArticles = {}
            DataArticles['articles'] = input_buffer.table;
            var componentArticles = Object.create(ComponentArticles);
            componentArticles.create(DataArticles.articles);
            renderComponent('#all_articles_main', componentArticles);

        });
    }
    /*
		DataArticles = {
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
	*/
}

function show_practice_main() {
    //console.log(date);
    $('#all_articles_main').hide()
    $('#main').hide();
    $('#vocart_main').hide();
    $('#practice_main').show();
}

function show_vocart_main(date) {	
    //console.log(date);
    $('#all_articles_main').hide()
    $('#main').hide();
    $('#vocart_main').show();
    $('#practice_main').hide();
	
	if(date == 'latest'){
		parameter.command = 'getLatestArticle';
		$.get(appUrl, parameter, function(data) {
			console.log(data);
		});
	}
	
}