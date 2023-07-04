function green(message){return "[[gb;#44D544;black]"+message+"]";}
function hotpink(message){return "[[gb; #FF50A7; black]"+message+"]";}
function blue(message){return "[[gb;#4fc3f7;black]"+message+"]";}
function gold(message){return "[[gb;#ffbf00;black]"+message+"]";}
function purple(message){return "[[gb;#CBC3E3;black]"+message+"]";}
function red(message){return "[[gb;#FF2424;black]"+message+"]";}


var banner=green(
" _______  __    _  _______  _______  ___       \n"+
"|   _   ||  |  | ||       ||       ||   |        \n"+
"|  |_|  ||   |_| ||    ___||    ___||   |     \n"+
"|       ||       ||   | __ |   |___ |   |        \n"+
"|       ||  _    ||   ||  ||    ___||   |___  \n"+
"|   _   || | |   ||   |_| ||   |___ |       | \n"+
"|__| |__||_|  |__||_______||_______||_______| \n"+
"",);


var intro = "Reading package lists ... Done\n" +
    "Reading state information ... Done\n" +
    "Checking dependencies... Done\n" +
    "Status ... Loading ... Complete\n\n" +
    "Hello world, welcome to my website. I'm Angel.\n" +
    "I am a software developer. I like to create things.\n\n";


var commands = {

    whoami: function() {
        this.echo("I am passionate about web development as well as low level programming like working on Kernels for Operating Systems. \n" +
            "Previously I worked at " +  hotpink("Deloitte Consulting") + " as an " + green("IT associate") + ", before that I was a " + green("Software Engineering Intern") + 
            " at Both: " + hotpink("Dell Technlogies") + " & " + hotpink("LaunchGood.") + " I am now a" + "full-time" + green(" Software Engineer \n") + " @ " + hotpink("NextEra Energy.") +
            " I graduated with my " + green("Bachelor's") + " in " + green("Computer Science") + " from " + blue("Florida International"
            + " University") + " with " + gold("Cum Laude Honors.\n\n") +
            green("Languages:") + " Python, Java, javascript & C \n\n");
    },
    projects: function() {
        this.echo("I'm currently working on building my own compilers for C and Java \n" + "As well as working on something special at " + green("EverythingButCode.io"));
    },
    contact: function() {
        this.echo("Email: AngelAlfarox at gmail dot com\n" +
            "Github: @ AngelsGit\n");
    },
    help: function() {
        this.echo(gold("whoami") + "       " + "get to know me");
        this.echo(green("projects") +"     " + "to see some interesting stuff I'm working on");
        this.echo(purple("contact") + "      " + "show my contact information");
        this.echo(red("clear") + "      " + "to clear the terminal");
    }
}

$(function() {
    var isTyping = false;

    function typed(finish_typing) {
        return function(term, message, delay, finish) {
            isTyping = true;
            var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                term.set_prompt('');
                var interval = setInterval(function() {
                    term.insert(message[c++]);
                    if (c == message.length) {
                        clearInterval(interval);
                        setTimeout(function() {
                            finish_typing(term, message, prompt);
                            isTyping = false
                            finish && finish();
                        }, delay);
                    }
                }, delay);
            }
        };
    }
    var typed_prompt = typed(function(term, message, prompt) {
        term.set_command('');
        term.set_prompt(message + ' ');
    });
    var typed_message = typed(function(term, message, prompt) {
        term.set_command('');
        term.echo(message)
        term.set_prompt(prompt);
        term.echo("To see who I am " + gold("whoami"));
        term.echo("To see read about some cool projects I'm working on " + green("projects"));
        term.echo("Want to get in touch? Type " + purple("contact"));
        term.echo("To view all commands type " + hotpink("help"));
        term.echo("To clear the terminal type " + red("clear \n\n"));
    });
    $('body').terminal(commands, {
        greetings: banner,
        prompt: blue("hi@Angel:~# "),
        completion: true,
        checkArity: false,
        onInit: function(term) {
            typed_message(term, intro, 35, function() {});
        },
        keydown: function(e) {
            if (isTyping) {
                return false;
            }
        },
        onBlur: function() {
            return false;
        },
        onClear: function(term) {
            term.echo(banner);
            term.echo(intro + "\n")
        }
    });
});
var base = 'https://raw.githubusercontent.com/iamcal/emoji-data/master/img-emojione-64/';
$.get('https://cdn.rawgit.com/iamcal/emoji-data/master/emoji.json').then(function(list) {
    var style = $('<style>');
    var text = {};
    var names = [];
    list.forEach(function(emoji) {
        var rule = '.emoji.' + emoji.short_name + '{' +
            'background-image: url(' + base + emoji.image + ');' +
            '}';
        style.html(style.html() + rule + '\n');
        text[emoji.text] = emoji.short_name;
        names.push(emoji.short_name);
    });
    var re = new RegExp('(' + Object.keys(text).map(function(text) {
        return $.terminal.escape_regex(text);
    }).join('|') + ')', 'g');
    style.appendTo('head');
    $.terminal.defaults.formatters.push(function(string) {
        return string.replace(/:([^:]+):/g, function(_, name) {
            if (names.indexOf(name) === -1) {
                return _;
            }
            return '[[;;;emoji ' + name + '] ]';
        }).replace(re, function(name) {
            return '[[;;;emoji ' + text[name] + '] ]';
        });
    });
});