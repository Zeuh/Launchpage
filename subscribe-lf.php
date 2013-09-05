<?php
/** Adapted by F. Gilbert from original code at WebResourcesDepot - http://www.webresourcesdepot.com*/

global $peopleFileName;
    // put full path to destination path
    $peopleFileName = "resonances-collecte-UefnHeFe.txt";

function GetField($input) {
    $input=strip_tags($input);
    $input=str_replace("<","<",$input);
    $input=str_replace(">",">",$input);
    $input=str_replace("#","%23",$input);
    $input=str_replace("'","`",$input);
    $input=str_replace(";","%3B",$input);
    $input=str_replace("script","",$input);
    $input=str_replace("%3c","",$input);
    $input=str_replace("%3e","",$input);
    $input=trim($input);
    return $input;
} 



/**Validate an email address.
Provide email address (raw input)
Returns true if the email address has the email 
address format and the domain exists.
*/
function EmailIsValid($email) {
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex)
   {
      $isValid = false;
   }
   else
   {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
         // local part length exceeded
         $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
         // domain part length exceeded
         $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
         // local part starts or ends with '.'
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
         // local part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
         // character not valid in domain part
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
         // domain part has two consecutive dots
         $isValid = false;
      }
      else if
(!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',
                 str_replace("\\\\","",$local)))
      {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local)))
         {
            $isValid = false;
         }
      }
   }
   return $isValid;
}

// Function to work on file
function OpenFile() {
    global $theFile, $peopleFileName;
    $theFile = fopen($peopleFileName, 'a+');
    if (!$theFile)
        return false;
    else
        return true;  
}

function EmailExists($email) {
    global $theFile;
    $exists = false;
    rewind($theFile);
    while (!feof($theFile)) {
        $userinfo = fscanf($theFile, "%s\t%s\t%s\t%s\n")
        list ($gdh, $type, $name, $emile) = $userinfo;
        if ($emile == $email) {
            $exists = true;
            break;
        }
    }
    return $exists;
}

function AddSubscriber($type, $nom, $email) {
    global $theFile;
    
    // Date & Time
    $gdh = date('ymd-His', time());
    $fd = "\t";
    $rd = "\n";
    
    // Write data
    fseek($theFile, -1, SEEK_END);
    $n = fwrite($theFile, $gdh . $fd . $type . $fd . $nom . $fd . $email . $rd);
    return $n > 0;
}

function CloseFile() {
    global $theFile;
    fclose($theFile);
}

/////// MAIN \\\\\\\\

// Let's get the values

$email 	 = GetField($_GET['email']);
$nom 	 = GetField($_GET['nom']);
$type 	 = GetField($_GET['type']);

if (!($email && $nom && $type)) {
    echo 4; // data missing
} else {
    if (!EmailIsValid($email)) {
        echo 2; // email is wrong
    } else {
        if (!OpenFile()) {
            echo -1; 
        } else {
            if (EmailExists($email)) {
                echo 3; // email exists
            } else {
                if(AddSubscriber($type, $nom, $email)) {
                    echo 1; // ok then
                } else {
                    echo -1;
                }
            }
            CloseFile();
        }
    }
}
?>