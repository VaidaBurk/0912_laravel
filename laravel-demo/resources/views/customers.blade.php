<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bands</title>
</head>

<body>
    <h1>Band View</h1>
    <table>
        <th>Title</th>
        <th>Lead Artist</th>
        <tbody>
            @foreach($bands as $band)
            <tr>
                <td>{{$band->title}}</td>
                <td>{{$band->lead_artist}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>