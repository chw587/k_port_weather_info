document.addEventListener('DOMContentLoaded', () => {
    const depSelect = document.getElementById('depAirportSelect');
    const arrSelect = document.getElementById('arrAirportSelect');
    const swapBtn = document.getElementById('swapAirports');

    const portInfoWrap = document.querySelector('.port-info_wrap');
    const startPortSpan = document.querySelector('.table_st1 .start-port');
    const arrivePortSpan = document.querySelector('.table_st1 .arrive-port');

    const tempInfoWrap = document.querySelector('.temp_info_wrap');
    const startInfoDiv = document.querySelector('.temp_info_wrap .start-info');
    const arriveInfoDiv = document.querySelector('.temp_info_wrap .arrive-info');

    let depSelected = false;
    let arrSelected = false;

    function getShortName(selectEl) {
        const optionText = selectEl.options[selectEl.selectedIndex].text;
        return optionText.slice(0, 2);
    }

    function updatePortInfo() {
        if (!depSelected || !arrSelected) {
            portInfoWrap.style.display = 'none';
            return;
        }

        startPortSpan.textContent = getShortName(depSelect);
        arrivePortSpan.textContent = getShortName(arrSelect);

        portInfoWrap.style.display = 'block';
    }

    depSelect.addEventListener('change', () => {
        depSelected = true;
        updatePortInfo();
    });

    arrSelect.addEventListener('change', () => {
        arrSelected = true;
        updatePortInfo();
    });

    function swapTempInfoPosition() {
        const placeholder = document.createComment('start-info-placeholder');
        tempInfoWrap.insertBefore(placeholder, startInfoDiv);

        tempInfoWrap.insertBefore(startInfoDiv, arriveInfoDiv);

        tempInfoWrap.insertBefore(arriveInfoDiv, placeholder);

        tempInfoWrap.removeChild(placeholder);
    }

    swapBtn.addEventListener('click', () => {
        // 1) select 값 교환
        const tempValue = depSelect.value;
        depSelect.value = arrSelect.value;
        arrSelect.value = tempValue;

        // change 이벤트를 발화시켜 기존 로직처리
        depSelect.dispatchEvent(new Event('change'));
        arrSelect.dispatchEvent(new Event('change'));

        // 2) temp_info_wrap 안의 div 위치 교환
        swapTempInfoPosition();
    });
});