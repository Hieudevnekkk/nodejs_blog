document.addEventListener('DOMContentLoaded', function () {
    var courseID;
    var deleteForm = document.forms['delete-course-form'];
    var restoreForm = document.forms['restore-course-form'];
    var exampleModal = document.getElementById('delete-course-model');
    var restoreBtn = $('.btn-restore');
    var checkBoxAll = $('#checkbox-all');
    var courseCheckBoxItem = $('input[name="courseIds[]"]');
    var btnActionSubmit = $('.check-all-submit-btn');

    exampleModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        courseID = button.getAttribute('data-id');
    });

    var btnDeleteCourse = document.getElementById('btn-delete-course');
    btnDeleteCourse.onclick = function () {
        deleteForm.action = '/courses/' + courseID + '/force?_method=DELETE';
        deleteForm.submit();
    };

    restoreBtn.click(function (e) {
        e.preventDefault();
        var courseID = $(this).data('id');
        restoreForm.action = '/courses/' + courseID + '/restore?_method=PATCH';
        restoreForm.submit();
    });

    // Check all changed
    checkBoxAll.change(function () {
        var isCheckedAll = $(this).prop('checked');
        courseCheckBoxItem.prop('checked', isCheckedAll);
        restoreBtnActionSubmit();
    });

    courseCheckBoxItem.change(function () {
        var isCheckedAll =
            courseCheckBoxItem.length === $('input[name="courseIds[]"]:checked').length;
        checkBoxAll.prop('checked', isCheckedAll);
        restoreBtnActionSubmit();
    });

    function restoreBtnActionSubmit() {
        var isChecked = $('input[name="courseIds[]"]:checked').length;
        if (isChecked) {
            btnActionSubmit.removeClass('disabled');
        } else {
            btnActionSubmit.addClass('disabled');
        }
    }

    
});
