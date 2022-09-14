<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>Order</title>
</head>

<body>
    <h1>Order Id: {{ $order->id }}, User Id: {{ $order->user_id }}, User email: {{ $order->user_email }}</h1>
    @foreach ($order_items as $item)
    <div class="row mx-5 my-2">
        <div class="col-2">Product ID: {{$item->id}}</div>
        <div class="col-2">Product name: {{$item->name}}</div>
        <div class="col-2">Quantity: {{$item->quantity}}</div>
    </div>
    @endforeach
</body>
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a
+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>

</html>