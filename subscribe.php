<?php

// Zend library include path
set_include_path(get_include_path() . PATH_SEPARATOR . "$_SERVER[DOCUMENT_ROOT]/Zend");

function GetDocument() {
    global $ss;
    
   // Prepare Google spreadsheet 
   include_once("Google_Spreadsheet.php");
    
    // FIXME : of course, you should put your google account here
    $u = "youraccount@gmail.com";
    $p = "thepassword";
    
    $ss = new Google_Spreadsheet($u,$p);
    $ss->useSpreadsheet("Contacts RESONANCES");
    
    // if not setting worksheet, "Sheet1" is assumed
    $ss->useWorksheet("Feuille 1");
}

// Function to search existing email
function EmailExists($email) {
    global $ss;
    $row = $ss->getRows('email='.'"'.$email.'"');
    if ($row) return 1;
    else return 0;
}


// Function to write to the document
function AddSubscriber($type, $nom, $email) {
    global $ss;
    // Prepare data
    $row = array (
    "GDH" => date('ymd-His', time()),
    "TYPE" => $type,
    "NOM" => $nom,
    "EMAIL" => $email
    );
    
    // Write data
    if ($ss->addRow($row)) echo 1;
    else echo 0;
}

// Functions to get the form values
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
function validEmail($email)
{
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


/////// MAIN \\\\\\\\

// Let's get the values
$type       = GetField($_GET['type']);
$nom        = GetField($_GET['nom']);
$email      = GetField($_GET['email']);
$emailOK    = validEmail($email);

if (!($email && $nom && $type)) {
    // data missing
    echo 4;
} else {
    if (!$emailOK) {
        // email wrong
        echo 2;
    } else {
        GetDocument();
        if (EmailExists($email)) {
            echo 3;
        } else {
            $r = AddSubscriber($type, $nom, $email);
            echo $r;
        }
    }
}


?>