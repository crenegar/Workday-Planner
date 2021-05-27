var tasks = {};
var loadDateTime = setInterval(() => {
    $("#currentDay").text(moment().format("dddd, MMMM Do h:mm:ss a"));
    auditTasks();
}, 1000);


let currentTime = moment();
currentTime = moment().format("k");

var auditTasks = function () {
    $(".row").each(function () {
        let rowTime = $(this).attr("time-block").replace("time", "");
        if (rowTime < currentTime) {
            $(this).children(".description").addClass("past");
        } else if (rowTime > currentTime) {
            $(this).children(".description").addClass("future");
        } else {
            $(this).children(".description").addClass("present");
        }
    });
};
auditTasks();
var createTask = (timeBlock, taskText) => {
    $(`[time-block="${timeBlock}"] .description`).append(taskText);
};
var loadTasks = () => {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = {
            
            time09: "",
            time10: "",
            time11: "",
            time12: "",
            time13: "",
            time14: "",
            time15: "",
            time16: "",
            time17: "",
        };
    }
   
    $.each(tasks, function (timeBlock, value) {
        createTask(timeBlock, value);
    });
};

var saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

$(".container").on("click", ".description", function () {
    $(".container").on("blur", "textarea", function () {
        var dataId = $(this).closest(".row").attr("time-block");
        var taskText = $(this).val().trim();
        createTask(dataId, taskText);
        var descriptionEl = $("<span>").addClass("col-8 col-sm-9 description");
        $("textarea").replaceWith(descriptionEl);
        descriptionEl.textContent = taskText;
        createTask(dataId, taskText);
        tasks[dataId] = taskText;
        auditTasks();
        return saveTasks();
    });

var text = $(this).text().trim();
  var textInput = $("<textarea>")
        .addClass("description form-control col-8 col-sm-9")
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    
});

$(".container").on("click", ".saveBtn", function () {
   
    var dataId = $(this).closest(".row").attr("time-block");    
    var taskText = $(`[time-block="${dataId}"] .description`).val();
    var descriptionEl = $("<span>").addClass("col-8 col-sm-9 description");
    $("textarea").replaceWith(descriptionEl);
    descriptionEl.textContent = taskText;
    createTask(dataId, taskText);
    auditTasks();
    return saveTasks();
});

loadTasks();