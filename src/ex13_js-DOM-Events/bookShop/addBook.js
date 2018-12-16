        var form = document.getElementById('formId');

        var btn = document.getElementById("buttonAdd");

        var closeX = document.getElementsByClassName("close")[0];

        var inputSearch = document.getElementById("searchText");
        var btnSearch = document.getElementById("searchButton");


        btn.onclick = function() {
            form.style.display = "block";
            inputSearch.style.visibility = "hidden";
            btnSearch.style.visibility = "hidden";
        }

        closeX.onclick = function() {
            form.style.display = "none";
            inputSearch.style.visibility = "visible";
            btnSearch.style.visibility = "visible";
        }

        window.onclick = function(event) {
            if (event.target == form) {
                form.style.display = "none";
                inputSearch.style.visibility = "visible";
                btnSearch.style.visibility = "visible";
            }
        }