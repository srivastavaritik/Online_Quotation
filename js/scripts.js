
var products = {
    'white': {
        
        'plain': {
            'unit_price': 129900,
            'photo': 'v-white.png' 
        },
        'printed': {
            'unit_price': 149900,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 129900,
            'photo': 'v-color.png' 
        },
        'printed': {
            'unit_price': 149900,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}




// Solution:

$(function(){

    //$("#quantity").val();
    //$("#style").val();
    //$("#color .option-button.selected").attr("id")
    //$("#quality .option-button.selected").attr("id")

    function update_params(){
        search_params.quantity= $("#quantity").val();
        search_params.color= $("#color .option-button.selected").attr("id");
        search_params.quality= $("#quality .option-button.selected").attr("id");
        search_params.style = $("#style").val();
        update_orderdetails();
    }
    update_params();

    function update_orderdetails() {
        var qualityId = "#" + search_params.quality;
        $("#result-quality").html($(qualityId).text());

        var styleId = "#" + search_params.style;
        var styleSelector = "#style option[value=" + search_params.style + "]";
        // console.log(styleSelector);
        $("#result-style").html($(styleSelector).text());

        var colorId = "#" + search_params.color;
        $("#result-color").html($(colorId).text());

        $("#result-quantity").html(search_params.quantity);
        var tot_price = (products[search_params.color][search_params.style].unit_price)* search_params.quantity;
        if(search_params.quantity ==""){
            tot_price = 0;
        }
        if(search_params.quantity > 1000){
                tot_price = tot_price * 0.8;
            }
            if(search_params.quantity > 500 && search_params.quantity <=1000){
                tot_price = tot_price * 0.88;
            }
            if(search_params.quantity > 100 && search_params.quantity<=500){
                tot_price = tot_price * 0.95;
            }
            
            console.log(tot_price);
            $("#price").html("INR "+tot_price.toLocaleString("en-IN", {style: "currency", currency: "INR"})+"");
            var img_link = products[search_params.color][search_params.style].photo;
            $("#photo-product").attr("src","img/"+img_link);
        
    }
    $("#quantity").change(function() {
        search_params.quantity = parseInt($("#quantity").val());
        update_orderdetails();
    });
    $("#quantity").keyup(function() {
        search_params.quantity = parseInt($("#quantity").val());
        update_orderdetails();
    });
    
    $("#style").change(function() {
        search_params.style = $("#style").val();
        update_orderdetails();
    });

    $(".option-button").click(function(){
        
        var clickedParam = $(this).parent().attr("id");
        var childSelector = "#" + clickedParam + " .option-button";
        $(childSelector).removeClass("selected");
        $(this).addClass("selected");
        var selectedChild = "#" + clickedParam + " .option-button.selected";
        search_params[clickedParam] = $(selectedChild).attr('id');
        update_order_details();

    });


   
});
 // Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// var tot_price = ((products[$("#result-color").html()][$("#result-style").html()].unit_price)* search_params.quantity);
        // if(search_params.quantity > 1000){
        //     tot_price = tot_price * 0.8;
        // }
        // if(search_params.quantity > 500 && search_params.quantity <=1000){
        //     tot_price = tot_price * 0.92;
        // }
        // if(search_params.quantity > 100 && search_params.quantity<=500){
        //     tot_price = tot_price * 0.8;
        // }
        // $("#price").html("INR ₹"+tot_price);
        







