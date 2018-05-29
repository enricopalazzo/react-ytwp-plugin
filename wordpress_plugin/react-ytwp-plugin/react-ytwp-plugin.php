<?php
/*
Plugin Name: React Youtube Component Plugin
Plugin URI: 
Description: Plugin let's you load custom youtube channel into any page or post via SHORTCODE.    
Version: 0.1
Author: Federico Dib
Author URI: federicodib@gmail.com
License: 
License URI: 
*/
if (!function_exists("extra_post_info")) {
    function extra_post_info($content)
    {
        $extra_info = "EXTRA INFOcc";
        return $content . $extra_info;
    }
    add_filter('the_content', 'extra_post_info');
}

function los_scripts()
{
    wp_register_script('scripts-dv', plugins_url('/assets/js/scripts.js', __FILE__));
    wp_register_script('scripts-dv', plugins_url('/assets/js/main.fb853b6a.js', __FILE__));
    wp_enqueue_style('bootstrap4', 'https://cdn.rawgit.com/twbs/bootstrap/48938155eb24b4ccdde09426066869504c6dab3c/dist/css/bootstrap.min.css');
   
}
add_action('wp_enqueue_scripts', 'los_scripts');

function insert_reactYT($atts)
{
    $a = shortcode_atts(array(
        'channelID' => '',
        'API_KEY' => '',
        'TERM' => ''
    ), $atts);

    $pasarObject = array(
      'dirUrl' => plugin_dir_url( __FILE__ ),
      'from_shortcode' => $a 
    );
    
    wp_localize_script( 'scripts-dv', 'from_php', $pasarObject);

    
    $html = <<<HTML
 <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
HTML;
    return $html;
    //return "foo = {$a['doc_id']}";
}
add_shortcode('insert-yt-channel', 'insert_reactYT');