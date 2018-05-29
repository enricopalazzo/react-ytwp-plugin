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
function los_scripts()
{
    wp_register_script('scripts-dv', plugins_url('/assets/js/scripts.js', __FILE__));
    wp_register_script('mainjs', plugins_url('/assets/js/main.165f1a88.js', __FILE__));
    wp_enqueue_style('bootstrap4', 'https://cdn.rawgit.com/twbs/bootstrap/48938155eb24b4ccdde09426066869504c6dab3c/dist/css/bootstrap.min.css');
    wp_enqueue_style('slick', plugins_url('/assets/css/styles.css', __FILE__));

   
}
add_action('wp_enqueue_scripts', 'los_scripts');

function insert_reactYT($atts,  $tag = '')
{
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
  
    $a = shortcode_atts(array(
        'channelid' => '',
        'api_key' => '',
        'term' => ''
    ), $atts, $tag);

    $pasarObject = array(
      'dirUrl' => plugin_dir_url( __FILE__ ),
      'from_shortcode' => $a 
    );
    wp_enqueue_script('scripts-dv');
    wp_localize_script( 'scripts-dv', 'from_php', $pasarObject);
    wp_enqueue_script('mainjs');

    
    $html = <<<HTML
 <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
HTML;
    return $html;
    //return "foo = {$a['doc_id']}";
}
add_shortcode('insert-yt-channel', 'insert_reactYT');