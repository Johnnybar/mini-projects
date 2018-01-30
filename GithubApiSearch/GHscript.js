(function() {

    var user;
    var username;
    var password;

    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('template');
    $(".search-ui").hide();
    Array.prototype.slice.call(templates).forEach(function(tmpl) {
        Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
    });

    $("#log-in").click(function() {
        $("#dialog-form").hide();
        $("#log-in").hide();
        $(".search-ui").show();
        username = $("#logInUsername").val();
        password = $("#logInPassword").val();

        var inp = $("#input");
        var go = $("#go");

        go.on('click', function() {
            var searchItem = inp.val();
            $.ajax({
                url: "https://api.github.com/users/"+searchItem+"/repos",
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + btoa(username + ':' + password)
                },
                data: {
                    limit: 20,
                },
                success: function(data) {
                    //  console.log(data);
                    var section = $("section");
                    section.html(Handlebars.templates.repos({
                        data
                    }));
                }
            });
        });
    });

    $(document).on('click', '.nameAndInfo', function(e){
        $(".eachCommit").empty();
        var name = $(e.currentTarget).find("h2").text();
        var repoName = $(e.currentTarget).find("span").text();
        username = $("#logInUsername").val();
        password = $("#logInPassword").val();

        $.ajax({
            url: "https://api.github.com/repos/"+ name+"/"+ repoName+"/commits",
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            },
            data: {
                limit: 10,
            },
            success: function(results) {
                $(".repo").append(Handlebars.templates.commitSection({
                    result: results.slice(0,9)

                }));

            }

        });
    });

})();
