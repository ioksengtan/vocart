var appUrl = 'https://script.google.com/macros/s/AKfycbzR4fhfQmSrbFrf336DHrKKodAUsRTN-Yf7_tyXStyH1Q8glYc/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1xRnAGXr3d7rL9PDIYtG9L6F827TEthKmCoje_veaKNo/edit#gid=0'; //$('#sheetsUrl'),
var sheetName = 'articles';
var load_status = {
    'articles': false,
}

$(document).ready(function() {
    $('#vocart_main').hide()
    $('#all_articles_main').hide()
    $('#practice_main').hide();

    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'total amount of vocaburaries'],
            [new Date(2021, 1, 17), 22],
            [new Date(2021, 1, 26), 55],
            [new Date(2021, 1, 27), 65],
            [new Date(2021, 2, 7), 71],
            [new Date(2021, 2, 8), 77],
            [new Date(2021, 2, 9), 85],
            [new Date(2021, 2, 10), 92],
            [new Date(2021, 2, 11), 101]
        ]);

        var options = {
            title: 'Vocaburary amount in Vocart',
            legend: {
                position: 'bottom'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }


    data = [{
            date: "2013-04-28",
            value: 135.98

        },
        {
            date: "2014-04-28",
            value: 145.98

        },
        {
            date: "2015-04-28",
            value: 155.98

        },
    ]
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


    var componentVocartTitle = Object.create(ComponentVocartTitle);
    var componentVocartTags = Object.create(ComponentVocartTags);

    
    

	

    renderComponent('#vocart_title', componentVocartTitle);
    renderComponent('#vocart_tags', componentVocartTags);
    
    
    parameter = {
        url: sheetsUrl,
        name: sheetName,
        command: 'getAllArticles'
    };
    parameter.command = 'getAllArticles';
    $.get(appUrl, parameter, function(data) {
        //console.log(data);			
        DataArticles = JSON.parse(data);
        //var componentVocarts = Object.create(ComponentVocarts);
        //componentVocarts.create(DataVocarts.table);
        //renderComponent('#vocarts', componentVocarts);
        [DataVocartCalendar, ArticleId, ArticleTitleDict, ArticleIdDict] = DataArticles2VocartCalendar(DataArticles);
        var componentVocartCalendar = Object.create(ComponentVocartCalendar);
        componentVocartCalendar.create(DataVocartCalendar, ArticleId);
        renderComponent('#calendar_main', componentVocartCalendar);		
		$('#calendar_loading').hide();
        var componentArticles = Object.create(ComponentArticles);
        componentArticles.create(DataArticles.table, ArticleId);
        renderComponent('#all_articles_main', componentArticles);
    });

    /*
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


    }*/

});

function DataArticles2VocartCalendar(DataArticles) {
    let VocartCalendar = {};
    let ArticleId = {};
    let ArticleTitleDict = {};
    let ArticleIdDict = {};
    for (i in DataArticles.table) {
        var theYear = DataArticles.table[i].year;
        var theMonth = DataArticles.table[i].month;
        var theDate = DataArticles.table[i].date;
        var theType = DataArticles.table[i].type;
        var theArtId = DataArticles.table[i].art_id;
        ArticleTitleDict[theArtId] = DataArticles.table[i].title;
        ArticleIdDict[theArtId] = i;
        //console.log(theYear + ','+theMonth + ','+theDate+','+theType);
        if (theYear in VocartCalendar) {
            if (theMonth in VocartCalendar[theYear]) {
                VocartCalendar[theYear][theMonth][theDate] = theType;
                ArticleId[theYear][theMonth][theDate] = theArtId;
            } else {
                VocartCalendar[theYear][theMonth] = {};
                VocartCalendar[theYear][theMonth][theDate] = theType;
                ArticleId[theYear][theMonth] = {};
                ArticleId[theYear][theMonth][theDate] = theArtId;
            }
        } else {
            VocartCalendar[theYear] = {};
            VocartCalendar[theYear][theMonth] = {};
            VocartCalendar[theYear][theMonth][theDate] = theType;
            ArticleId[theYear] = {};
            ArticleId[theYear][theMonth] = {};
            ArticleId[theYear][theMonth][theDate] = theArtId;
        }

    }

    return [VocartCalendar, ArticleId, ArticleTitleDict, ArticleIdDict]
}

function cleanDiv(div) {
    $(div).empty();
}

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
    create: function(DataVocartCalendar, ArticleId) {
        var ele = document.createElement('div');
        years = ['2021'];
        for (var year_id in years) {
            year = years[year_id];
            $(ele).append('<h3>' + year + '</h3>');
            for (var month in DataVocartCalendar[year]) {
                $(ele).append('<h4>' + Months[month] + '</h4>');
                for (var date in DataVocartCalendar[year][month]) {
                    if (DataVocartCalendar[year][month][date].includes("na")) {
                        $(ele).append('<i class="bi bi-' + DataVocartCalendar[year][month][date].split('na_')[1] + '"></i>');
                    } else if ( DataVocartCalendar[year][month][date].includes("practice") ){						
						$(ele).append('<a href="javascript:show_practice(' + ArticleId[year][month][date] + ')">' + '<i class="bi bi-stickies"></i>' + '</a> ');
					} else {
                        $(ele).append('<a href="javascript:show_vocart_main(' + ArticleId[year][month][date] + ')">' + date + '</a> ');
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
		//console.log(DataPractice);
        var ele = document.createElement('div');
		
		$(ele).append('<div onkeypress="return (this.innerText.length <= ' + DataPractice.hint.length +')" contenteditable="true">'+ DataPractice.hint +'</div>');
		$(ele).append('<p>' + DataPractice.description+ '</p>');
		for ( example_id in DataPractice.examples ){
			$(ele).append('<p>' + DataPractice.examples[example_id] + '</p>');
		}
		$(ele).append('<p>answer:' + DataPractice.answer + '</p>');
		
		/*
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
		*/
        this.dom = ele;
        //console.log(this.dom);
    }
};
var ComponentVocarts = {
    dom: '',
    create: function(DataVocarts) {
        //console.log(DataVocarts);
        var ele = document.createElement('div');
		
        //$(ele).append('<h2>' + DataVocarts.title.content + '<h2>');
        for (var i in DataVocarts.vocarts) {
            var componentVocart_reg = Object.create(ComponentVocart);
            componentVocart_reg.create(DataVocarts.vocarts[i]);
            $(ele).append(componentVocart_reg.dom);
        }
        this.dom = ele;
    }

}

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

            for (example_id in DataVocart.vocs[voc_id].ex) {
                reg_str += "ex:  " + DataVocart.vocs[voc_id].ex[example_id] + "<br/>";
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

var ComponentCollapseArticle = {
    dom: '',
    create: function(title_in, content_in) {
        var ele = document.createElement('div');
        $(ele).append("	<div class=\"accordion-item\">\
    <h2 class=\"accordion-header\" >\
      <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\
        " + title_in + "\
      </button>\
    </h2>\
    <div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\">\
      <div class=\"accordion-body\">\
        " + content_in + "\
      </div>\
    </div>\
   </div>\
   ");
        this.dom = ele;
    }
    /*
	<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
   </div>
	*/
}

/*
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
*/


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
    create: function(articles, ArticleId) {
        //console.log(articles);
        var ele = document.createElement('div');
        $(ele).append('<ul>');
        for (article_id in articles) {
            if (articles[article_id].type == 'vocart' & articles[article_id].title != '') {
                //$(ele).append("<li><a href='javascript:show_vocart_main(" + ArticleId[articles[article_id].year][articles[article_id].month][articles[article_id].date] + ")'>" + articles[article_id]['title'] + "</a>(<a href='" + articles[article_id].link + "'>[source]</a>)</li>")
				$(ele).append("	<div class=\"accordion-item\">\
    <h2 class=\"accordion-header\" >\
      <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\
        " + articles[article_id]['year'] + '/' + articles[article_id]['month'] + '/' + articles[article_id]['date'] + ' ' + articles[article_id]['title'] + "\
      </button>\
    </h2>\
    <div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\">\
      <div class=\"accordion-body\">\
        " + articles[article_id]['content'] + "\
      </div>\
    </div>\
   </div>\
   ");
            }
        }
        $(ele).append('</ul>');
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

    }

}

function show_practice_main() {
    //console.log(date);
    $('#all_articles_main').hide()
    $('#main').hide();
    $('#vocart_main').hide();
    $('#practice_main').show();
}
var tmp = 'test';

function show_practice(date) {
    //console.log(date);
    $('#all_articles_main').hide()
    $('#main').hide();
    $('#vocart_main').show();
    $('#practice_main').hide();
	
	cleanDiv('#vocarts');
	var DataPractices = [
		{
			'hint':'a_______',
			'description':'a person who believes strongly in political or social change and takes part in activities such as public protests to try to make this happen  ',
			'examples':['an animal rights a_______'],
			'answer':'activist'
		},
		{
			'hint':'b_______',
			'description':'b person who believes strongly in political or social change and takes part in activities such as public protests to try to make this happen  ',
			'examples':['bn animal rights a_______'],
			'answer':'bctivist'
		}		
	]
	var componentPracticeList = []
	for (i in DataPractices){
		var componentPractice = Object.create(ComponentPractice);	
		componentPractice.create(DataPractices[i]);
		componentPracticeList.push(componentPractice)
		renderComponent('#vocarts', componentPractice);
	}
	

}

function show_vocart_main(date) {
    //console.log(date);
    $('#all_articles_main').hide()
    $('#main').hide();
    $('#vocart_main').show();
    $('#practice_main').hide();
	$('#vocarts_loading').show();
    if (date == 'latest') {
        cleanDiv('#vocarts');

        $('#vocarts').append('<h1><a href="' + DataArticles.table[DataArticles.table.length - 1].link + '" target="_blank">' + DataArticles.table[DataArticles.table.length - 1].title + '</a></h1>');
        parameter.command = 'getLatestArticle';
        $.get(appUrl, parameter, function(data) {
            //console.log(data);			
			
            var DataVocarts = JSON.parse(data);
            var componentVocarts = Object.create(ComponentVocarts);
            componentVocarts.create(DataVocarts.table);
			renderComponent('#vocarts', "<p>quoted from: </p>");
            renderComponent('#vocarts', componentVocarts);
			$('#vocarts_loading').hide();
        });
    } else {
        parameter = {
            url: sheetsUrl,
            name: sheetName,
            command: 'getArticle',
            article_id: date
        };
        cleanDiv('#vocarts')
        $('#vocarts').append('<p>quoted from: </p><h1><a href="' + DataArticles.table[ArticleIdDict[date]].link + '" target="_blank">' + ArticleTitleDict[date] + '</a></h1>');
        $.get(appUrl, parameter, function(data) {
            //console.log(data);			
            DataVocarts = JSON.parse(data);
            //console.log(DataVocarts);
            componentVocarts = Object.create(ComponentVocarts);
            componentVocarts.create(DataVocarts.table);			
            renderComponent('#vocarts', componentVocarts);
			$('#vocarts_loading').hide();
        });
    }

}