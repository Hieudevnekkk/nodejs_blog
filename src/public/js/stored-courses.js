document.addEventListener('DOMContentLoaded', function () {
    var courseID;
    var deleteForm = document.forms['delete-course-form'];
    var exampleModal = document.getElementById('delete-course-model');
    var checkboxAll = $('#checkbox-all');
    var courseItemCheckbox = $('input[name="courseIds[]"]');
    var checkAllSubmitBtn = $('.check-all-submit-btn');

    exampleModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        courseID = button.getAttribute('data-id');
    });

    var btnDeleteCourse = document.getElementById('btn-delete-course');
    btnDeleteCourse.onclick = function () {
        deleteForm.action = '/courses/' + courseID + '?_method=DELETE';
        deleteForm.submit();
    };

    // Check all changed
    checkboxAll.change(function () {
        var isCheckedAll = $(this).prop('checked');
        courseItemCheckbox.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    });

    // Course item changed
    courseItemCheckbox.change(function () {
        var isCheckedAll =
            courseItemCheckbox.length === $('input[name="courseIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    });

    // Re-render check all submit button
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="courseIds[]"]:checked').length;
        if (checkedCount) {
            checkAllSubmitBtn.removeClass('disabled');
        } else {
            checkAllSubmitBtn.addClass('disabled');
        }
    }
});
